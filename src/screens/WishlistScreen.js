import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function WishlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>

      <Text style={styles.message}>
        No favorite products yet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  message: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 16,
    color: "#64748b",
  },
});