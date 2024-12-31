import { openURL } from "expo-linking";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Modal } from "react-native";
import { Text, TouchableRipple, Card, Title, Paragraph, Button } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ResourcesPage = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleCall = (phoneNumber) => {
    openURL(`tel:${phoneNumber}`);
  };

  const handleMessage = (phoneNumber) => {
    openURL(`sms:${phoneNumber}`);
  };

  const resources = [
    {
      id: "1",
      title: "Emergency Helpline",
      icon: "warning",
      color: "#FF5252",
      numbers: ["112", "999", "911"], // Multiple numbers
      actionLabel: "Call",
      type: "call",
      description: "Immediate assistance during emergencies.",
    },
    {
      id: "2",
      title: "Mental Health Support",
      icon: "psychology",
      color: "#2196F3",
      numbers: ["1800123456", "0800102030", "130012345"], // Multiple numbers
      actionLabel: "Call",
      type: "call",
      description: "Support for mental health and well-being.",
    },
    {
      id: "3",
      title: "Domestic Violence Helpline",
      icon: "security",
      color: "#FF9800",
      numbers: ["100", "1800202121", "911"], // Multiple numbers
      actionLabel: "Call",
      type: "call",
      description: "Help and support for domestic violence victims.",
    },
    {
      id: "4",
      title: "SMS Support",
      icon: "sms",
      color: "#4CAF50",
      numbers: ["12345", "67890", "112"], // Multiple numbers
      actionLabel: "Message",
      type: "message",
      description: "Send an SMS for support and information.",
    },
  ];

  const renderResource = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        setSelectedResource(item);
        setModalVisible(true); // Show modal to select a number
      }}
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

  const handleSelectNumber = (number) => {
    if (selectedResource.type === "call") {
      handleCall(number);
    } else {
      handleMessage(number);
    }
    setModalVisible(false); // Close the modal after selection
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full"
        style={{ elevation: 2 }}
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

      {/* Modal for selecting a number */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a number</Text>
            {selectedResource?.numbers.map((number, index) => (
              <Button
                key={index}
                mode="contained"
                style={styles.modalButton}
                onPress={() => handleSelectNumber(number)}
              >
                {number}
              </Button>
            ))}
            <Button  mode="text" onPress={() => setModalVisible(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  modalButton: {
    marginVertical: 5,
    width: "100%",
  },
  closeButton: {
    marginTop: 10,
  },
});
