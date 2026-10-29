import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  message: {
    fontSize: 16,
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#6366f1",
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});