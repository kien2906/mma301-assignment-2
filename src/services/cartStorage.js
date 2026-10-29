import AsyncStorage from "@react-native-async-storage/async-storage";
const CART_KEY = "cart";
export const saveCart = async (items) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.log("Save cart error:", error);
  }
};
export const getCart = async () => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Get cart error:", error);
    return [];
  }
}