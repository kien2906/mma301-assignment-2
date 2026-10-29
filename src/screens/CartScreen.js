import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import useCart from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartScreen() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onDecrease={() => decreaseQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
            onIncrease={() => increaseQuantity(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
        
      />

      <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
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
    marginBottom: 20,
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    fontSize: 16,
    color: "#64748b",
  },
});
