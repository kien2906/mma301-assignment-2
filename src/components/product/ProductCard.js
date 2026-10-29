import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />

      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>

      <Text style={styles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 6,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 130,
    borderRadius: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6366f1",
    marginTop: 5,
  },
});