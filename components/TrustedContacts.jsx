import * as React from "react";
import { Modal } from "react-native";
import { Text, View } from "react-native";
import {   Portal, Button,   TextInput } from "react-native-paper";

export default function TrustedContacts() {
  const [visible, setVisible] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    { name: "John Doe", phone: "123-456-7890", primary: true },
    { name: "Jane Smith", phone: "987-654-3210", primary: false },
  ]);

  const [newContactName, setNewContactName] = React.useState("");
  const [newContactPhone, setNewContactPhone] = React.useState("");

  const toggleModal = () => setVisible(!visible);

  const addContact = () => {
    if (newContactName && newContactPhone) {
      setContacts([
        ...contacts,
        { name: newContactName, phone: newContactPhone, primary: false },
      ]);
      setNewContactName("");
      setNewContactPhone("");
    }
  };

  const setPrimary = (index) => {
    setContacts(
      contacts.map((contact, i) => ({ ...contact, primary: i === index }))
    );
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Button
        mode="contained"
        onPress={toggleModal}
        className="bg-blue-500 py-2 px-4"
      >
        Manage Trusted Contacts
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleModal}
          animationType="slide"
          contentContainerStyle={{
            padding: 20,
            backgroundColor: "white", 
            height: "100%",
          }}
        >
          <Text className="text-xl font-bold mb-4 text-black">Trusted Contacts</Text>

          {contacts.map((contact, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mb-2"
            >
              <Text className="text-lg">
                {contact.name} - {contact.phone}
              </Text>
              <Button
                mode={contact.primary ? "contained" : "outlined"}
                className={contact.primary ? "bg-green-500" : "border-gray-500"}
                onPress={() => setPrimary(index)}
              >
                {contact.primary ? "Primary" : "Set Primary"}
              </Button>
            </View>
          ))}

          <TextInput
            label="Name"
            value={newContactName}
            onChangeText={setNewContactName}
            className="mb-2"
          />

          <TextInput
            label="Phone"
            value={newContactPhone}
            onChangeText={setNewContactPhone}
            className="mb-4"
            keyboardType="phone-pad"
          />

          <Button
            mode="contained"
            onPress={addContact}
            className="bg-blue-500 py-2 mb-4"
          >
            Add Contact
          </Button>

          <Button
            mode="outlined"
            onPress={toggleModal}
            className="border-gray-500 py-2"
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}
