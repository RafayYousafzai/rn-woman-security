import { View, Text, StyleSheet, Dimensions , TouchableOpacity} from 'react-native';
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const GpsTracking = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
     
      <View style={styles.header}>
      <TouchableOpacity
            onPress={() => router.push("/home")}
            className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full"
            style={{
              elevation: 2,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
        <Text style={styles.headerText}>GPS Tracking</Text>
  
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>Map View</Text>
      </View>

      {/* Stats Container */}
      <View style={styles.statsContainer}>
        {/* Speed Card */}
        <View style={styles.card}>
          <MaterialIcons name="speed" size={24} color="#007AFF" />
          <Text style={styles.cardTitle}>Current Location</Text>
          <Text style={styles.cardValue}>0 km/h</Text>
        </View>

        {/* Distance Card */}
        <View style={styles.card}>
          <MaterialIcons name="timeline" size={24} color="#007AFF" />
          <Text style={styles.cardTitle}>Distance</Text>
          <Text style={styles.cardValue}>0.0 km</Text>
        </View>
      </View>

      {/* Location Details */}
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={20} color="#007AFF" />
          <Text style={styles.locationText}>Latitude: 0.000000°</Text>
        </View>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={20} color="#007AFF" />
          <Text style={styles.locationText}>Longitude: 0.000000°</Text>
        </View>
      </View>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusIndicator} />
        <Text style={styles.statusText}>GPS Signal: Strong</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: `center`
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 12,
  },
  mapPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '45%',
  },
  cardTitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  cardValue: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  locationContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    margin: 16,
    borderRadius: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusText: {
    color: '#666',
    fontSize: 14,
  },
});

export default GpsTracking;