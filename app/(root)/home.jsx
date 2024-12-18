import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

const { height, width } = Dimensions.get("window");

export default function HomePage() {
  const router = useRouter();
  const { signOut } = useAuth();

  const { user } = useUser();
  const [appName] = useState("Wagar");

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const menuItems = [
    {
      title: "Emergency Alert",
      icon: "warning",
      color: "#FF5252",
      route: "emergency-alert",
      description: "Instantly send SOS signals with precise location tracking.",
    },
    {
      title: "GPS Tracking",
      icon: "location-on",
      color: "#2196F3",
      route: "gps-tracking",
      description: "Real-time location sharing with trusted contacts.",
    },
    {
      title: "Safety Resources",
      icon: "info-outline",
      color: "#4CAF50",
      route: "resources",
      description: "Expert safety guides, support, and emergency protocols.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileSection}>
          <MaterialIcons
            name="account-circle"
            size={50}
            color="#4A4A4A"
            style={styles.profileIcon}
          />
          <View>
            <Text style={styles.greetingText}>
              Welcome, {user?.firstName || "User"}
            </Text>
            <Text style={styles.appTagline}>Stay Safe, Stay Connected</Text>
          </View>
        </View>
        <Text style={styles.appName}>{appName}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableRipple
            key={index}
            onPress={() => router.push(item.route)}
            style={[styles.menuItem, { backgroundColor: `${item.color}10` }]}
            rippleColor={`${item.color}40`}
          >
            <View style={styles.menuItemContent}>
              <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
              >
                <MaterialIcons name={item.icon} size={28} color="#FFF" />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.menuTitle, { color: item.color }]}>
                  {item.title}
                </Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={28}
                color={item.color}
              />
            </View>
          </TouchableRipple>
        ))}

        <TouchableOpacity onPress={handleSignOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    elevation: 2,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    marginRight: 15,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  appTagline: {
    fontSize: 14,
    color: "#666",
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    overflow: "hidden",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 19,
    fontWeight: "700",
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
