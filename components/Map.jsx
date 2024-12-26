import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ filteredContacts }) {
  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    if (filteredContacts.length > 0) {
      const totalLatitude = filteredContacts.reduce(
        (acc, contact) => acc + contact.latitude,
        0
      );
      const totalLongitude = filteredContacts.reduce(
        (acc, contact) => acc + contact.longitude,
        0
      );

      const averageLatitude = totalLatitude / filteredContacts.length;
      const averageLongitude = totalLongitude / filteredContacts.length;

      setInitialRegion({
        latitude: averageLatitude,
        longitude: averageLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLocation(filteredContacts);
    } else {
      console.log("No contacts found for map display");
    }
  }, [filteredContacts]);

  return (
    <View style={styles.container}>
      {location && (
        <MapView style={styles.map} initialRegion={initialRegion}   userInterfaceStyle={'dark'} >
          {location.map((contact, index) => (
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
      )}
      {!location && <Text>Nothing to show yet.</Text>}
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
