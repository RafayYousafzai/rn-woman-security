import { useState, useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useUser } from "@clerk/clerk-expo";
const iconPath = require("@/assets/icon.png");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("new-assigned-booking", {
      name: "New Assigned Booking",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 150, 250, 150],
      lightColor: "#0856bc",
      sound: "notification.wav",
      icon: iconPath,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const updateUserTokenInDatabase = async (expoPushToken, user) => {
  try {
    const docRef = doc(db, "users", user.email);
    await updateDoc(docRef, { expoPushToken: expoPushToken });
    return true;
  } catch (error) {
    console.error("Error updating User:", error);
    return false;
  }
};

export default function PushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const { user } = useUser();

  console.log("expoPushToken:", expoPushToken);
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token ?? "");

        if (token && token.length > 0) {
          await updateUserTokenInDatabase(token, user);
        }
      } catch (error) {
        setExpoPushToken(`${error}`);
      }
    };

    initializeNotifications(); // Invoke the async function

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return <View />;
}
