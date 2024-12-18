import React from "react";
import { Stack } from "expo-router/stack";
import PushNotifications from "@/lib/notifications/index";
import { FirebaseProvider } from "@/context/firebaseContext";

export default function Layout() {
  return (
    <FirebaseProvider>
      <PushNotifications />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FirebaseProvider>
  );
}
