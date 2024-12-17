import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TrustedContacts from "@/components/TrustedContacts";

export default function EmergencyAlertPage() {
  return (
    <View className="flex-1 bg-white px-6 py-8 justify-center items-center">
      {/* Page Header */}
      <Text className="text-3xl font-extrabold text-gray-800 mb-8">
        Emergency Alert
      </Text>

      {/* Send Alert Button */}
      <TouchableOpacity
        className="bg-red-600 w-64 aspect-square rounded-full justify-center items-center shadow-lg mb-8"
        onPress={() => console.log("Alert Sent to Trusted Contacts!")}
      >
        <Text className="text-white text-2xl font-bold uppercase">
          Send Alert
        </Text>
      </TouchableOpacity>

      {/* Section Header */}
      <Text className="text-xl font-semibold text-gray-700 mb-4">Settings</Text>

      {/* Trusted Contacts Section */}
      <View className="w-full h-40">
        <TrustedContacts />
      </View>
    </View>
  );
}
