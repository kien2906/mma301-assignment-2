import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { showWishlistNotification } from "../services/notificationService";
export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  const { addCart, items } = useCart();

  const { toggleWishlist, isFavorite, error } = useWishlist();

  const [savingWishlist, setSavingWishlist] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);

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
    addCart(product);
    setCartModalVisible(true);
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
    <>
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
          style={[
            styles.wishlistButton,
            savingWishlist && styles.disabledButton,
          ]}
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

      <Modal
        visible={cartModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCartModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={30} color="#16A34A" />
            </View>

            <Text style={styles.modalTitle}>Đã thêm vào giỏ hàng</Text>
            <Text style={styles.modalSubtitle}>
              Sản phẩm đã được thêm thành công.
            </Text>

            <View style={styles.modalProduct}>
              <Image
                source={{ uri: product.thumbnail }}
                style={styles.modalProductImage}
              />
              <View style={styles.modalProductInfo}>
                <Text style={styles.modalProductTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.modalProductMeta}>
                  Số lượng: {quantityInCart + 1}
                </Text>
                <Text style={styles.modalProductPrice}>${product.price}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => {
                setCartModalVisible(false);
                navigation.navigate("ProductList", { screen: "Cart" });
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.cartButtonText}>Xem giỏ hàng</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => setCartModalVisible(false)}
              activeOpacity={0.75}
            >
              <Text style={styles.continueButtonText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.58)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },

  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  modalTitle: {
    color: "#0F172A",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
  },

  modalSubtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 7,
    textAlign: "center",
  },

  modalProduct: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 12,
    marginTop: 22,
    marginBottom: 20,
  },

  modalProductImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  modalProductInfo: {
    flex: 1,
    marginLeft: 12,
  },

  modalProductTitle: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "600",
  },

  modalProductMeta: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 5,
  },

  modalProductPrice: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },

  cartButton: {
    width: "100%",
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    borderRadius: 14,
  },

  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginRight: 8,
  },

  continueButton: {
    width: "100%",
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  continueButtonText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },
});
