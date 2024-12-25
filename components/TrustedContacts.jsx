import React, { useEffect, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFirebase } from "@/context/firebaseContext";
import { Card, IconButton, Title, Paragraph, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function TrustedContacts() {
  const { users, updateUser, userData } = useFirebase();

  const [visible, setVisible] = useState(false);
  const [myContacts, setMyContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (userData?.trustedContacts) {
      setMyContacts(userData.trustedContacts);
    }
  }, [userData]);

  const toggleModal = () => {
    setSearchQuery("");
    setVisible(!visible);
  };

  const filteredContacts = users.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !myContacts.some((c) => c.phone === contact.phone)
  );

  const handleUpdateUser = (contact) => {
    const updatedContacts = [...myContacts, contact];
    setMyContacts(updatedContacts);
    updateUser({ trustedContacts: updatedContacts });
  };

  const handleRemoveContact = (contact) => {
    const updatedContacts = myContacts.filter((c) => c.phone !== contact.phone);
    setMyContacts(updatedContacts);
    updateUser({ trustedContacts: updatedContacts });
  };

  return (
    <View style={styles.container}>
      {/* Manage Trusted Contacts Button */}
      <Button
        mode="contained"
        icon="account-multiple"
        onPress={toggleModal}
        style={styles.manageButton}
        contentStyle={styles.manageButtonContent}
        labelStyle={styles.manageButtonLabel}
      >
        Manage Trusted Contacts
      </Button>

      {/* Modal */}
      {visible && (
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Title style={styles.title}>Trusted Contacts</Title>
                <Paragraph style={styles.paragraph}>
                  Add, remove or search for contacts you trust to receive
                  alerts.
                </Paragraph>

                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="#888"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search Contacts"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery.length > 0 && (
                    <IconButton
                      icon="close"
                      size={20}
                      onPress={() => setSearchQuery("")}
                      accessibilityLabel="Clear search"
                    />
                  )}
                </View>

                {/* Search Results */}
                {searchQuery.length > 0 ? (
                  filteredContacts.length > 0 ? (
                    <FlatList
                      data={filteredContacts}
                      keyExtractor={(item) => item.phone}
                      style={styles.searchResults}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.searchItem}
                          onPress={() => {
                            handleUpdateUser(item);
                            setSearchQuery("");
                            Keyboard.dismiss();
                          }}
                        >
                          <View>
                            <Text style={styles.searchItemText}>
                              {item.name}
                            </Text>
                            <Text style={styles.searchItemPhone}>
                              {item.phone}
                            </Text>
                          </View>
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="#6200ee"
                          />
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <Text style={styles.emptyText}>No contacts found.</Text>
                  )
                ) : null}

                {/* Trusted Contacts List */}
                <Card style={styles.contactsCard}>
                  <Card.Title
                    title="Your Trusted Contacts"
                    titleStyle={styles.contactsCardTitle}
                  />
                  <Card.Content>
                    {myContacts.length === 0 ? (
                      <Text style={styles.emptyText}>
                        No trusted contacts added yet.
                      </Text>
                    ) : (
                      <FlatList
                        data={myContacts}
                        keyExtractor={(item) => item.phone}
                        renderItem={({ item }) => (
                          <View style={styles.contactItem}>
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.contactText}>
                                {item.name}
                              </Text>
                              <Text style={styles.contactPhone}>
                                {item.phone}
                              </Text>
                            </View>
                            <IconButton
                              icon="delete"
                              color="#e53935"
                              size={20}
                              onPress={() => handleRemoveContact(item)}
                              accessibilityLabel="Remove contact"
                            />
                          </View>
                        )}
                      />
                    )}
                  </Card.Content>
                </Card>

                {/* Close Button */}
                <Button
                  mode="contained"
                  onPress={toggleModal}
                  style={styles.closeButton}
                  icon="close"
                >
                  Close
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  manageButton: {
    backgroundColor: "#1E90FF", // Changed from purple to Dodger Blue
    borderRadius: 30, // Increased border radius for a more rounded look
    alignSelf: "center",
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5, // Added shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  manageButtonContent: {
    flexDirection: "row-reverse", // Icon on the right
    alignItems: "center",
  },
  manageButtonLabel: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  paragraph: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  searchResults: {
    maxHeight: 150,
    marginBottom: 20,
  },
  searchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  searchItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  searchItemPhone: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    color: "#000",
    fontSize: 14,
    marginVertical: 20,
  },
  contactsCard: {
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  contactsCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  contactPhone: {
    fontSize: 14,
    color: "#000",
    marginTop: 2,
  },
  closeButton: {
    marginTop: 20,
    borderRadius: 25,
  },
});
