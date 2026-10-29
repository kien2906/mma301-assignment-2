import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useWishlist from "../hooks/useWishlist";

export default function WishlistScreen({ navigation }) {
  const { wishlist, loading, error, toggleWishlist, fetchWishlist } =
    useWishlist();

  // Tự động tải lại Wishlist mỗi khi mở màn hình
  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
    }, []),
  );

  // Xóa sản phẩm khỏi Wishlist
  const handleRemove = (product) => {
    Alert.alert(
      "Remove Product",
      `Do you want to remove "${product.title}" from your wishlist?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await toggleWishlist(product);

              if (success) {
                // Tải lại danh sách sau khi xóa thành công
                await fetchWishlist();

                Alert.alert("Success", "Product removed from wishlist!");
              } else {
                Alert.alert("Error", "Failed to remove product.");
              }
            } catch (error) {
              console.log("Remove wishlist error:", error);

              Alert.alert("Error", "Failed to remove product.");
            }
          },
        },
      ],
    );
  };

  // Hiển thị trạng thái đang tải
  if (loading && wishlist.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading wishlist...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>My Wishlist ❤️</Text>

      <Text style={styles.subtitle}>Your favorite products</Text>

      {/* Error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Wishlist */}
      <FlatList
        data={wishlist}
        keyExtractor={(item) => String(item.id)}
        refreshing={loading}
        onRefresh={fetchWishlist}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          wishlist.length === 0 ? styles.emptyList : styles.listContent
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Product information */}
            <TouchableOpacity
              style={styles.productInfo}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product: item,
                })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.price}>${item.price}</Text>
              </View>
            </TouchableOpacity>

            {/* Remove button */}
            <TouchableOpacity
              style={styles.removeButton}
              activeOpacity={0.7}
              onPress={() => handleRemove(item)}
            >
              <Text style={styles.removeText}>Remove from Wishlist</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>💔</Text>

              <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>

              <Text style={styles.emptyText}>
                Add your favorite products to see them here.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 24,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },

  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 95,
    height: 95,
    resizeMode: "contain",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#6366F1",
    marginTop: 10,
  },

  removeButton: {
    backgroundColor: "#FEF2F2",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  removeText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 14,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },

  emptyBox: {
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  error: {
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
});
