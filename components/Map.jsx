import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ filteredContacts }) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {filteredContacts.length > 0 &&
          filteredContacts.map((contact, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: contact.latitude,
                longitude: contact.longitude,
              }}
              title={contact.name}
              description={`Phone: ${contact.phone}`}
            />
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    height: "100%",
    width: "113%",
  },
  map: {
    flex: 1,
  },
});
