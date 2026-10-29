import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No products found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: "#64748b",
  },
});