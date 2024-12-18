import * as React from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import TrustedContacts from "@/components/TrustedContacts";
import { useFirebase } from "@/context/firebaseContext";

export default function EmergencyAlertPage() {
  const { userData } = useFirebase();
  const [loading, setLoading] = React.useState(false);

  const handleAlert = async () => {
    if (!userData?.trustedContacts || userData.trustedContacts.length === 0) {
      Alert.alert("No Trusted Contacts", "Please add trusted contacts to send an alert.");
      return;
    }

    const expoPushTokens = userData.trustedContacts
      .map((contact) => contact.expoPushToken)
      .filter((token) => token); // Ensure token is not undefined/null

    if (expoPushTokens.length === 0) {
      Alert.alert("No Valid Tokens", "None of your contacts have a valid push token.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        to: expoPushTokens,
        title: "Emergency Alert",
        body: "Your family or friends are in danger. Please respond quickly.",
      };

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to send alert. Status: ${response.status}`);
      }

      Alert.alert("Alert Sent", "Your trusted contacts have been notified.");
    } catch (error) {
      console.error("Error sending alert:", error);
      Alert.alert("Error", "Failed to send alert. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-8 justify-center items-center">
      {/* Page Header */}
      <Text className="text-3xl font-extrabold text-gray-800 mb-8">
        Emergency Alert
      </Text>

      {/* Send Alert Button */}
      <TouchableOpacity
        className="bg-red-600 w-64 aspect-square rounded-full justify-center items-center shadow-lg mb-8"
        onPress={handleAlert}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text className="text-white text-2xl font-bold uppercase">
            Send Alert
          </Text>
        )}
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
