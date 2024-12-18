import React, { useEffect, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useFirebase } from "@/context/firebaseContext";

export default function TrustedContacts() {
  const { users, updateUser, userData } = useFirebase();

  const [visible, setVisible] = useState(false);
  const [myContacts, setMyContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const user = userData;

    if (user?.trustedContacts) {
      setMyContacts(user.trustedContacts);
    }
  }, [userData]);

  const toggleModal = () => setVisible(!visible);

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

              {/* Search Results */}
              {searchQuery.length > 0 && filteredContacts.length > 0 ? (
                <FlatList
                  data={filteredContacts}
                  keyExtractor={(item) => item.phone}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.searchItem}
                      onPress={() => {
                        handleUpdateUser(item);
                        setSearchQuery("");
                      }}
                    >
                      <Text style={styles.searchItemText}>{item.name}</Text>
                      <Text style={styles.searchItemPhone}>{item.phone}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : searchQuery.length > 0 ? (
                <Text style={styles.emptyText}>No contacts found.</Text>
              ) : null}

              {/* Trusted Contacts List */}
              <FlatList
                data={myContacts}
                keyExtractor={(item) => item.phone}
                renderItem={({ item }) => (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>
                      {item.name} - {item.phone}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveContact(item)}
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
