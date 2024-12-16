import React, { useState } from "react";
import { useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { database } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function TrustedContacts() {
  const [visible, setVisible] = useState(false);
  const [myContacts, setMyContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = () => setVisible(!visible);

  const removeContact = (index) => {
    setMyContacts(myContacts.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const get = async () => {
      try {
        const contacts = [];
        const querySnapshot = await getDocs(collection(database, "users"));
        querySnapshot.forEach((doc) => {
          contacts.push({ id: doc.id, ...doc.data() });
        });
        setAllContacts(contacts);
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    };
    get();
  }, []);

  const filteredContacts = allContacts
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !myContacts.some((contact) => contact.phone === contact.phone)
    )
    .slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Manage Trusted Contacts Button */}
      <TouchableOpacity style={styles.manageButton} onPress={toggleModal}>
        <Text style={styles.manageButtonText}>Manage Trusted Contacts</Text>
      </TouchableOpacity>

      {/* Modal */}
      {visible && (
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Trusted Contacts</Text>
              <TextInput
                style={styles.searchBar}
                placeholder="Search Contacts"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {searchQuery.length > 0 && filteredContacts.length > 0 && (
                <View style={styles.searchResults}>
                  {filteredContacts.map((contact, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.searchItem}
                      onPress={() => {
                        setMyContacts([
                          ...myContacts,
                          { name: contact.name, phone: contact.phone },
                        ]);
                        setSearchQuery(""); // Clear search bar after adding
                      }}
                    >
                      <Text style={styles.searchItemText}>{contact.name}</Text>
                      <Text style={styles.searchItemPhone}>
                        {contact.phone}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Trusted Contacts List */}
              <FlatList
                data={myContacts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>
                      {item.name} - {item.phone}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeContact(index)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    No trusted contacts added yet.
                  </Text>
                }
              />

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  manageButton: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 5,
  },
  manageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalContainer: {
    padding: 30,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contactText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#e53935",
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginVertical: 20,
  },
  searchBar: {
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  searchResults: {
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
  },
  searchItemPhone: {
    fontSize: 14,
    color: "#555",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
