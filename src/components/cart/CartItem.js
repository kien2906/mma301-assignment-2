import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.button,
              item.quantity === 1 && styles.disabledButton,
            ]}
            onPress={onDecrease}
            disabled={item.quantity === 1}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={[
              styles.button,
              item.quantity >= item.stock && styles.disabledButton,
            ]}
            onPress={onIncrease}
          >
            <Text
              style={styles.buttonText}
              disabled={item.quantity >= item.stock}
            >
              +
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRemove}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.4,
  },

  price: {
    fontSize: 16,
    color: "#2563eb",
    marginTop: 5,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 18,
  },

  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
  },

  remove: {
    color: "red",
    marginLeft: 15,
  },
});
