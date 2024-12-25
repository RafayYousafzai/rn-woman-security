import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useUser } from "@clerk/clerk-expo";
import { database } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export default function useLocationFetching() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const locationSubscriptionRef = useRef(null);
  const { user, isLoaded } = useUser();

  async function startLocationUpdates() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      console.log("Starting location updates...");

      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 1,
          distanceInterval: 0.1,
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
