import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#B0BEC5",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="sign-in"
        options={{
          title: "Log In",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="sign-in" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sign-up"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => (
            <Ionicons size={20} name="person-add-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF", // White background for the tab bar
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0", // Light grey border on top
    height: 60, // Adjusted height for better visual appeal
    paddingBottom: 5, // Added padding for better tab spacing
  },
  tabLabel: {
    fontSize: 12, // Smaller font size for a sleek look
    fontWeight: "600", // Make the label bold for better readability
    textTransform: "uppercase", // Capitalize tab labels for consistency
  },
});
