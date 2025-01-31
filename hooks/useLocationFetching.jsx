import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useUser } from "@clerk/clerk-expo";
import { database } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "@/context/firebaseContext";
import { sendPushNotification } from "@/lib/sendPushNotification";

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

      sendPushNotification(
        userData,
        `Emergency Alert Sent by ${userData.name}`,
        `Your family or friends are in danger. Please respond quickly. ${userData.name} needs your help! phone: ${userData.phone}`
      );

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
