import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useUser } from "@clerk/clerk-expo";
import { database } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "@/context/firebaseContext";
import { Alert } from "react-native";

export default function useLocationFetching() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const locationSubscriptionRef = useRef(null);
  const { user, isLoaded } = useUser();
  const { userData } = useFirebase();

  async function startLocationUpdates() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      handleAlert(userData);

      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10,
          distanceInterval: 1,
        },
        (newLocation) => {
          console.log("New location:", newLocation);
          setLocation(newLocation);
          isLoaded && updateUserLocationInDatabase(newLocation, user);
        }
      );
    } catch (error) {
      console.error("Error starting location updates:", error);
      setErrorMsg("Error starting location updates");
    }
  }

  function stopLocationUpdates() {
    if (locationSubscriptionRef.current) {
      console.log("Stopping location updates...");
      locationSubscriptionRef.current.remove();
      locationSubscriptionRef.current = null;
      isLoaded && updateUserLocationInDatabase(null, user);
    } else {
      console.log("No active location subscription to stop.");
    }
  }

  return { location, errorMsg, startLocationUpdates, stopLocationUpdates };
}

const updateUserLocationInDatabase = async (newLocation, user) => {
  const primaryEmail = user.primaryEmailAddress?.emailAddress;

  try {
    const docRef = doc(database, "users", primaryEmail);
    await updateDoc(docRef, { location: newLocation });
    return true;
  } catch (error) {
    console.error("Error updating User:", error);
    return false;
  }
};

const handleAlert = async (userData) => {
  if (!userData?.trustedContacts || userData.trustedContacts.length === 0) {
    Alert.alert(
      "No Trusted Contacts",
      "Please add trusted contacts below to send an emergency alert.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  const expoPushTokens = userData.trustedContacts
    .map((contact) => contact.expoPushToken)
    .filter((token) => token);

  if (expoPushTokens.length === 0) {
    Alert.alert(
      "No Valid Tokens",
      "None of your contacts have a valid push notification token. Please ensure your contacts have the app installed.",
      [{ text: "OK", style: "default" }]
    );
    return;
  }

  try {
    const payload = {
      to: expoPushTokens,
      title: `Emergency Alert Sent by ${userData.name}`,
      body: `Your family or friends are in danger. Please respond quickly. ${userData.name} needs your help! phone: ${userData.phone}`,
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send alert. Status: ${response.status}`);
    }

    Alert.alert(
      "Alert Sent Successfully",
      "Your trusted contacts have been notified of your emergency.",
      [{ text: "OK", style: "default" }]
    );
  } catch (error) {
    console.error("Error sending alert:", error);
    Alert.alert(
      "Error Sending Alert",
      "We couldn't send your alert. Please check your internet connection and try again.",
      [{ text: "OK", style: "default" }]
    );
  } finally {
    setLoading(false);
  }
};
