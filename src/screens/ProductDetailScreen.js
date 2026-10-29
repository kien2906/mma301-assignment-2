import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { showWishlistNotification } from "../services/notificationService";
export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  const { addCart, items } = useCart();

  const { toggleWishlist, isFavorite, error } = useWishlist();

  const [savingWishlist, setSavingWishlist] = useState(false);

  const favorite = isFavorite(product.id);

  const cartItem = items.find((item) => item.id === product.id);

  const quantityInCart = cartItem?.quantity ?? 0;

  const stock = product.stock ?? 0;

  const isOutOfStock = quantityInCart >= stock;

  // Add to Cart
  const handleAddCart = () => {
    if (isOutOfStock) {
      Alert.alert("Out of Stock", "Cannot add more products.");
      return;
    }

    addCart(product);

    Alert.alert("Success", `${product.title} added to your cart!`);
  };

  // Add / Remove Wishlist
  const handleWishlist = async () => {
    if (savingWishlist) return;

    try {
      setSavingWishlist(true);

      const success = await toggleWishlist(product);

      if (success === false) {
        Alert.alert("Error", "Failed to update wishlist.");
        return;
      }

      // Hiển thị thông báo sau khi cập nhật Wishlist thành công
      await showWishlistNotification(product.title);
    } catch (error) {
      console.log("Wishlist error:", error);

      Alert.alert("Error", "Failed to update wishlist.");
    } finally {
      setSavingWishlist(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Product Image */}
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      {/* Product Information */}
      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>${product.price}</Text>

      <Text style={styles.category}>Category: {product.category}</Text>

      <Text style={styles.stock}>Available: {stock}</Text>

      <Text style={styles.description}>{product.description}</Text>

      {/* Add to Cart */}
      <TouchableOpacity
        style={[styles.button, isOutOfStock && styles.disabledButton]}
        onPress={handleAddCart}
        disabled={isOutOfStock}
      >
        <Text style={styles.buttonText}>
          {stock <= 0
            ? "Out of Stock"
            : isOutOfStock
              ? "Stock Limit Reached"
              : "Add to Cart"}
        </Text>
      </TouchableOpacity>

      {/* Wishlist */}
      <TouchableOpacity
        style={[styles.wishlistButton, savingWishlist && styles.disabledButton]}
        onPress={handleWishlist}
        disabled={savingWishlist}
      >
        {savingWishlist ? (
          <ActivityIndicator color="#6366f1" />
        ) : (
          <Text style={styles.wishlistText}>
            {favorite ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Firebase Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  content: {
    paddingBottom: 40,
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6366f1",
    marginTop: 10,
  },

  category: {
    fontSize: 15,
    marginTop: 10,
    color: "#64748b",
  },

  stock: {
    fontSize: 15,
    color: "#16a34a",
    marginTop: 10,
  },

  description: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 24,
  },

  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  disabledButton: {
    opacity: 0.5,
  },

  wishlistButton: {
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },

  wishlistText: {
    fontSize: 16,
    fontWeight: "600",
  },

  errorText: {
    color: "#dc2626",
    marginTop: 12,
    textAlign: "center",
  },
});
