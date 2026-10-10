import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function AIRecommendationScreen() {
  const [prompt, setPrompt] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        AI Shopping Assistant
      </Text>

      <Text style={styles.label}>
        What are you looking for?
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Describe your needs..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Ask Gemini AI
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  label: {
    marginTop: 30,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    minHeight: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});