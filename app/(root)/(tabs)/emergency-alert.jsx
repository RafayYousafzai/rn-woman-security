import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TrustedContacts from "@/components/TrustedContacts";
import { useFirebase } from "@/context/firebaseContext";
import { sendPushNotification } from "@/lib/sendPushNotification";
import { useRouter } from "expo-router";

export default function EmergencyAlertPage() {
  const { userData } = useFirebase();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleAlert = async () =>
    sendPushNotification(
      userData,
      "Emergency Alert",
      "This is an emergency alert from your trusted contact."
    );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full"
          style={{
            elevation: 2,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <View className="px-6 py-8">
          {/* Header Section */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-extrabold text-gray-800 text-center">
              Emergency Alert
            </Text>
            <Text className="text-gray-500 text-center mt-2 px-4">
              Press the button below to instantly alert your trusted contacts
            </Text>
          </View>

          {/* Alert Button Section */}
          <View className="items-center mb-12">
            <TouchableOpacity
              className={`w-72 aspect-square ${
                loading ? "bg-red-400" : "bg-red-500"
              } rounded-full justify-center items-center shadow-xl`}
              style={{
                elevation: 8,
              }}
              onPress={handleAlert}
              disabled={loading}
            >
              {loading ? (
                <View className="items-center">
                  <ActivityIndicator size="large" color="#fff" />
                  <Text className="text-white mt-4 text-lg font-medium">
                    Sending Alert...
                  </Text>
                </View>
              ) : (
                <View className="items-center">
                  <Ionicons name="warning-outline" size={48} color="#fff" />
                  <Text className="text-white text-2xl font-bold mt-4">
                    SEND ALERT
                  </Text>
                  <Text className="text-white text-sm mt-2 opacity-80">
                    Tap to notify contacts
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Trusted Contacts Section */}

          <View className="">
            <TrustedContacts />
          </View>

          {/* Information Card */}
          <View className="bg-blue-50 rounded-2xl p-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="information-circle" size={24} color="#2563eb" />
              <Text className="text-blue-600 font-semibold text-lg ml-2">
                How It Works
              </Text>
            </View>
            <Text className="text-blue-800">
              When you press the alert button, all your trusted contacts will
              receive an immediate notification with your emergency status. Make
              sure to add trusted contacts who can respond quickly in case of
              emergency.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
