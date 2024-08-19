import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MapView, { MapHeatmap } from "react-native-maps";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 49.2827, // Vancouver's latitude
    longitude: -123.1207, // Vancouver's longitude
    latitudeDelta: 0.0922, // Latitude span for zoom level
    longitudeDelta: 0.0421, // Longitude span for zoom level
  });
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        onPress={(data, details = null) => {
          const point = details?.geometry?.location;
          console.log("🚀 ~ LocationSearch ~ point:", point);
          console.log(data, details);

          if (!point) {
            return;
          }
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        fetchDetails={true}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons
              name="search-outline"
              size={24}
              color={Colors.medium}
            ></Ionicons>
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            backgroundColor: "#fff",
            padding: 8,
          },
        }}
      />

      <MapView style={styles.map} region={location} showsUserLocation />

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1,
  },
});
