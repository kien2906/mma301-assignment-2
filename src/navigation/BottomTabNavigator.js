import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import WishlistScreen from "../screens/WishlistScreen";
import AIRecommendationScreen from "../screens/AIRecommendationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CartScreen from "../screens/CartScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const createTabOptions = (label, icon, activeIcon) => ({
  headerShown: false,
  tabBarLabel: label,
  tabBarIcon: ({ color, size, focused }) => (
    <Ionicons
      name={focused ? activeIcon : icon}
      color={color}
      size={size}
    />
  ),
});

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProductListScreen}
        options={createTabOptions("Trang chủ", "home-outline", "home")}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={createTabOptions("Yêu thích", "heart-outline", "heart")}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={createTabOptions("Giỏ hàng", "cart-outline", "cart")}
      />
      <Tab.Screen
        name="AI"
        component={AIRecommendationScreen}
        options={createTabOptions("Trợ lý AI", "sparkles-outline", "sparkles")}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={createTabOptions("Cài đặt", "settings-outline", "settings")}
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
