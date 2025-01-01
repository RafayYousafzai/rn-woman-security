import React from "react";
import { Stack } from "expo-router/stack";
import { FirebaseProvider } from "@/context/firebaseContext";

export default function Layout() {
  return (
    <FirebaseProvider>
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
