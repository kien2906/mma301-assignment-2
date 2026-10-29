import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CartSummary = ({ totalItems, totalPrice }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.row}>
        <Text>Total Items:</Text>
        <Text>{totalItems}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.totalText}>Total Price:</Text>

        <Text style={styles.totalPrice}>
          ${totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6366f1",
  },
});