import { openURL } from "expo-linking";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ResourcesPage = () => {
  const handleCall = (phoneNumber) => {
    openURL(`tel:${phoneNumber}`);
    console.log("fsd");
  };

  const handleMessage = (phoneNumber) => {
    openURL(`sms:${phoneNumber}`);
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-center mb-6">Resources</Text>

      <View className="space-y-4 gap-4">
        <TouchableOpacity
          onPress={() => handleCall("112")}
          className="flex-row items-center justify-between  p-8 bg-blue-100 rounded-lg"
        >
          <Text className="text-lg font-semibold">Emergency Helpline</Text>
          <Text>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCall("1800123456")}
          className="flex-row items-center justify-between  p-8 bg-green-100 rounded-lg"
        >
          <Text className="text-lg font-semibold">Mental Health Support</Text>
          <Text>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCall("100")}
          className="flex-row items-center justify-between  p-8 bg-red-100 rounded-lg"
        >
          <Text className="text-lg font-semibold">
            Domestic Violence Helpline
          </Text>
          <Text>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleMessage("12345")}
          className="flex-row items-center justify-between  p-8 bg-yellow-100 rounded-lg"
        >
          <Text className="text-lg font-semibold">SMS Support</Text>
          <Text>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResourcesPage;
