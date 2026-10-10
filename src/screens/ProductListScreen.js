import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import ProductCard from "../components/product/ProductCard";
import { products } from "../data/products";

export default function ProductListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Products</Text>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
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
});