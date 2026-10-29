import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WishlistScreen from "../screens/WishlistScreen";
import AIRecommendationScreen from "../screens/AIRecommendationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CartScreen from "../screens/CartScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ProductListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AI"
        component={AIRecommendationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={BottomTabNavigator}
        options={{ title: "SmartShop" }}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Detail" }}
      />
    </Stack.Navigator>
  );
}
