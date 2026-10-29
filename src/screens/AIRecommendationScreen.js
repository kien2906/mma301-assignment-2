import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import { getAIRecommendations } from "../services/geminiService";

export default function AIRecommendationScreen({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!prompt.trim()) {
      Alert.alert("Validation", "Please enter your shopping needs.");
      return;
    }

    setLoading(true);
    setRecommendations([]);

    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=100"
      );

      if (!response.ok) {
        throw new Error("Failed to load products.");
      }

      const data = await response.json();

      const results = await getAIRecommendations(
        prompt,
        data.products || []
      );

      setRecommendations(results);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.productInfo}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.price}>${item.price}</Text>

        <Text style={styles.reason}>{item.reason}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AI Shopping Assistant 🤖</Text>

      <TextInput
        style={styles.input}
        placeholder="What are you looking for?"
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRecommend}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Analyzing..." : "Get Recommendations"}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6366f1"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={recommendations}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Enter your needs to get AI recommendations.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    minHeight: 90,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6366f1",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#6366f1",
    marginVertical: 6,
  },
  reason: {
    fontSize: 13,
    color: "#475569",
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 30,
  },
});