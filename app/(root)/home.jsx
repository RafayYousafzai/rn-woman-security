import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function HomePage() {
  return (
    <View className="flex-1 p-4 justify-center items-center">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Welcome to SafeApp
      </Text>

      <Button
        mode="contained"
        className="w-full bg-red-500 py-2 mb-4"
        onPress={() => router.navigate("emergency-alert")}
      >
        Emergency Alert
      </Button>

      <Button
        mode="contained"
        className="w-full bg-blue-500 py-2 mb-4"
        onPress={() => router.navigate("gps-tracking")}
      >
        GPS Tracking
      </Button>

      <Button
        mode="contained"
        className="w-full bg-green-500 py-2"
        onPress={() => router.navigate("resources")}
      >
        Resources
      </Button>
    </View>
  );
}
