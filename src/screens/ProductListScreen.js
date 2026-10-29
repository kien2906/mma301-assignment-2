import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "../components/product/ProductCard";
import useProducts from "../hooks/useProducts";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import { searchProducts } from "../services/productService";

export default function ProductListScreen({ navigation }) {
  const {
    products,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMore,
    loadMore,
    refresh,
  } = useProducts();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleSearch = async (text) => {
    setKeyword(text);

    if (!text.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      setSearchLoading(true);

      const products = await searchProducts(text.trim());
     
      setSearchResults(products);
    } catch (error) {
      console.log("Search error:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && products.length === 0) {
    return <ErrorMessage message={error} onRetry={refreshing} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Products</Text>
      <TextInput
        placeholder="Search products..."
        value={keyword}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={searchResults !== null ? searchResults : products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                product: item,
              })
            }
          />
        )}
        refreshing={refreshing}
        onEndReached={() => {
          if (searchResults === null && hasMore && !loadingMore && !error) {
            loadMore();
          }
        }}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#6366f1"
              style={{ margin: 20 }}
            />
          ) : error ? (
            <ErrorMessage message={error} onRetry={loadMore} />
          ) : null
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 16,
  },

  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    margin: 12,
  },
});
