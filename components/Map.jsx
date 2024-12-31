import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function MapScreen({ filteredContacts = [] }) {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (Array.isArray(filteredContacts) && filteredContacts.length > 0) {
      setLocation(filteredContacts);
    } else {
      console.warn("No contacts found for map display");
    }
  }, [filteredContacts]);

  if (!location.length) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Nothing to show yet.</Text>
      </View>
    );
  }

  // Generate HTML for embedding OpenStreetMap with Markers
  const generateMapHTML = () => {
    const markersScript = location
      .map(
        (contact) => `
        L.marker([${contact.latitude}, ${contact.longitude}])
          .addTo(map)
          .bindPopup('<b>${contact.name}</b><br>${contact.phone}')
          .openPopup();
      `
      )
      .join("\n");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Map</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          #map {
            height: 100%;
            width: 100%;
          }
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${location[0].latitude}, ${location[0].longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          ${markersScript}
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: generateMapHTML() }}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  map: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "#333",
  },
});
