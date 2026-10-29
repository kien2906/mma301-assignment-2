import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      {" "}
      <AppNavigator />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
