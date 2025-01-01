import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import {
  Text,
  TouchableRipple,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useFirebase } from "@/context/firebaseContext";
import PushNotifications from "@/lib/notifications";

export default function HomePage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { userData } = useFirebase();

  const [appName] = useState("Wagar");

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const menuItems = [
    {
      id: "1",
      title: "Emergency Alert",
      icon: "warning",
      color: "#FF5252",
      route: "emergency-alert",
      description: "Instantly send SOS signals with precise location tracking.",
      additionalInfo: "Use in critical situations",
    },
    {
      id: "2",
      title: "GPS Tracking",
      icon: "location-on",
      color: "#2196F3",
      route: "gps-tracking",
      description: "Real-time location sharing with trusted contacts.",
      additionalInfo: "Track your journey",
    },
    {
      id: "4",
      title: "Live Map",
      icon: "map",
      color: "#4CAF50",
      route: "live-map",

      description:
        "You can see here all the users location who shared with you.",
      additionalInfo: "Guides & Support your journey",
    },
    {
      id: "3",
      title: "Safety Resources",
      icon: "info-outline",
      color: "#003049",
      route: "resources",
      description: "Expert safety guides, support, and emergency protocols.",
      additionalInfo: "Access guides & support",
    },
    // Add more menu items as needed
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableRipple
      onPress={() => router.push(item.route)}
      rippleColor={`${item.color}30`}
      borderless={true}
      style={styles.menuItemWrapper}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <MaterialIcons name={item.icon} size={28} color="#FFF" />
          </View>
          <View style={styles.textContainer}>
            <Title style={styles.menuTitle}>{item.title}</Title>
            <Paragraph style={styles.menuDescription}>
              {item.description}
            </Paragraph>
            {item.additionalInfo && (
              <View style={styles.additionalInfo}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#666"
                />
                <Text style={styles.additionalText}>{item.additionalInfo}</Text>
              </View>
            )}
          </View>
          <MaterialIcons name="chevron-right" size={28} color="#999" />
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PushNotifications />

      <StatusBar barStyle="light-content" />
      {/* Header Section */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.profileSection}>
            {/* <MaterialIcons
              name="account-circle"
              size={55}
              color="#fff"
              style={styles.profileIcon}
            /> */}
            <View style={styles.userInfo}>
              <Text style={styles.greetingText}>
                Hello, {userData?.name || "User"}
              </Text>
              <Text style={styles.appTagline}>
                Girls: Stay Safe, Stay Connected. Your support network starts
                here.
              </Text>
            </View>
          </View>
          <Text style={styles.appName}>{appName}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.logoutContainer}
            >
              <MaterialIcons
                name="logout"
                size={22}
                color="#555"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  headerWrapper: {
    backgroundColor: "#4CAF50",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    marginRight: 12,
  },
  userInfo: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  appTagline: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
    width: Dimensions.get("window").width - 180,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  menuContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  menuItemWrapper: {
    marginBottom: 15,
  },
  card: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    backgroundColor: "#fff",
  },
  cardContent: {
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
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  additionalInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  additionalText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  logoutText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
});
