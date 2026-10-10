import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          Your cart is empty
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#64748b",
  },
});