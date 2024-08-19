import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Categories from "../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "../components/Restaurants";
import Colors from "../constants/Colors";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Categories />
        <Text style={styles.header}> Top picks in your neighborhood</Text>

        <Restaurants />
        <Text style={styles.header}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { top: 80, backgroundColor: Colors.lightGrey },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
    paddingHorizontal: 16,
  },
});
