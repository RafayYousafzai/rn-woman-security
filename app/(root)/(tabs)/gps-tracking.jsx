import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import useLocationFetching from "@/hooks/useLocationFetching"; // Adjust path as needed

export default function GpsTracking() {
  const { startLocationUpdates, stopLocationUpdates } = useLocationFetching();
  const [isTracking, setIsTracking] = useState(false);

  const toggleTracking = () => {
    if (isTracking) {
      stopLocationUpdates();
    } else {
      startLocationUpdates();
    }
    setIsTracking(!isTracking);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Send and notify your live location to trusted contacts{" "}
      </Text>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTracking}>
        <Text style={styles.buttonText}>{isTracking ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  toggleButton: {
    backgroundColor: "#007BFF",
    borderRadius: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
    aspectRatio: 1,
    height: 200,
    width: 200,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    margin: "auto",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
