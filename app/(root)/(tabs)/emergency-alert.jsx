import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import TrustedContacts from "@/components/TrustedContacts";

export default function EmergencyAlertPage() {
  return (
    <View className="flex-1 bg-gray-100 p-4 justify-center items-center">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Emergency Alert
      </Text>

      <Button
        mode="contained"
        className="w-full bg-red-500 py-2 mb-6"
        onPress={() => console.log("Alert Sent to Trusted Contacts!")}
      >
        Send Alert
      </Button>

      <Text className="text-lg font-medium text-gray-700 mb-4">Settings</Text>

      <TrustedContacts />
    </View>
  );
}
