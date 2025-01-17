import { openURL } from "expo-linking";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  Text,
  TouchableRipple,
  Card,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ResourcesPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleMessage = (phoneNumber) => {
    openURL(`sms:${phoneNumber}`);
  };

  const resources = [
    {
      id: "1",
      title: "Women's Aid Organization (WAO)",
      icon: "warning",
      color: "#FF5252",
      numbers: [
        {
          label: "Call",
          details: "Mon-Fri: 9am-5pm, Sat-Sun: 8am-4pm",
          phone: "03-30008858",
        },
        { label: "WhatsApp (TINA)", details: "", phone: "018-9888058" },
      ],
      type: "call",
      description:
        "Case management, assistance with police reports, connecting to medical aid, mental health support, and shelter.",
    },
    {
      id: "2",
      title: "International Catholic Migration Commission (ICMC)",
      icon: "psychology",
      color: "#2196F3",
      numbers: [
        {
          label: "Arabic, Somali & English",
          details: "",
          phone: "+6016 204 0291",
        },
      ],
      type: "call",
      description:
        "Case management, mental health and psychosocial support, shelter, and service referrals.",
    },
    {
      id: "3",
      title: "Asylum Access",
      icon: "security",
      color: "#FF9800",
      numbers: [
        { label: "Hotline", details: "", phone: "+60322015439" },
        { label: "WhatsApp", details: "", phone: "+60172094059" },
      ],
      type: "call",
      description:
        "Legal advice and assistance for employment disputes and related issues.",
    },
    {
      id: "4",
      title: "Clinks",
      icon: "security-update-good",
      color: "#FF9800",
      numbers: [
        {
          details:
            "Jalan Pudu > Tzu-Chi Free Clinic Seri Kembangan > Klinik Amal Muhajir Selayang > Klinik QFFD - IMARET",
        },
      ],
    },
  ];

  const handleCall = (phoneNumber) => {
    openURL(`tel:${phoneNumber}`);
  };

  const renderResource = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        setSelectedResource(item);
        setModalVisible(true);
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
            <Paragraph style={styles.resourceDescription}>
              {item.description}
            </Paragraph>
          </View>
          <View style={styles.actionContainer}>
            {item.type === "call" ? (
              <Ionicons name="call-outline" size={24} color={item.color} />
            ) : (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={item.color}
              />
            )}
            <Text style={[styles.actionLabel, { color: item.color }]}>
              {item.actionLabel}
            </Text>
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
    setModalVisible(false);
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
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedResource?.title}</Text>
            {selectedResource?.numbers.map((number, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalButton}
                onPress={() => number.phone && handleSelectNumber(number.phone)}
              >
                <Text style={styles.modalButtonText}>
                  {`${number.label ? number.label + ": " : ""}${
                    number.details || number.phone
                  }`}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              mode="text"
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              textColor="black"
            >
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
    backgroundColor: "#f1faee",
  },
  modalButtonText: {
    color: "#000",
    marginHorizontal: 15,
    padding: 10,
  },
  closeButton: {
    marginTop: 10,
    color: "#000",
  },
});
