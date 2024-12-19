import { openURL } from "expo-linking";
import React from "react";
import { View, StyleSheet, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { Text, TouchableRipple, Card, Title, Paragraph } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ResourcesPage = () => {
  const handleCall = (phoneNumber) => {
    openURL(`tel:${phoneNumber}`);
  };
    const router = useRouter();

  const handleMessage = (phoneNumber) => {
    openURL(`sms:${phoneNumber}`);
  };

  const resources = [
    {
      id: "1",
      title: "Emergency Helpline",
      icon: "warning",
      color: "#FF5252",
      action: () => handleCall("112"),
      actionLabel: "Call",
      type: "call",
      description: "Immediate assistance during emergencies.",
    },
    {
      id: "2",
      title: "Mental Health Support",
      icon: "psychology",
      color: "#2196F3",
      action: () => handleCall("1800123456"),
      actionLabel: "Call",
      type: "call",
      description: "Support for mental health and well-being.",
    },
    {
      id: "3",
      title: "Domestic Violence Helpline",
      icon: "security",
      color: "#FF9800",
      action: () => handleCall("100"),
      actionLabel: "Call",
      type: "call",
      description: "Help and support for domestic violence victims.",
    },
    {
      id: "4",
      title: "SMS Support",
      icon: "sms",
      color: "#4CAF50",
      action: () => handleMessage("12345"),
      actionLabel: "Message",
      type: "message",
      description: "Send an SMS for support and information.",
    },
  ];

  const renderResource = ({ item }) => (
    <TouchableRipple
      onPress={item.action}
      rippleColor={`${item.color}30`}
      borderless={true}
      style={styles.ripple}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <MaterialIcons name={item.icon} size={28} color="#FFF" />
          </View>
          <View style={styles.textContainer}>
            <Title style={styles.resourceTitle}>{item.title}</Title>
            <Paragraph style={styles.resourceDescription}>{item.description}</Paragraph>
          </View>
          <View style={styles.actionContainer}>
            {item.type === "call" ? (
              <Ionicons name="call-outline" size={24} color={item.color} />
            ) : (
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={item.color} />
            )}
            <Text style={[styles.actionLabel, { color: item.color }]}>{item.actionLabel}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity
                  onPress={() => router.push("/home")}
                  className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full"
                  style={{
                    elevation: 2,
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </TouchableOpacity>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f7" />
      <Text style={styles.header}>Resources</Text>

      <FlatList
        data={resources}
        renderItem={renderResource}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ResourcesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  ripple: {
    borderRadius: 15,
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
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  resourceDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actionContainer: {
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});
