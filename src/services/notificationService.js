import * as Notifications from "expo-notifications";

export const showWishlistNotification = async (productName) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "❤️ Wishlist",
        body: `Đã thêm "${productName}" vào danh sách yêu thích!`,
        sound: "default",
      },
      trigger: null,
    });
  } catch (error) {
    console.log("Notification error:", error);
  }
};
