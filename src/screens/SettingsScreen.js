import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Switch,
  ScrollView,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";

// Cấu hình hiển thị notification khi app đang mở
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SettingsScreen() {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Kiểm tra quyền notification khi mở Settings
  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationEnabled(status === "granted");
    } catch (error) {
      console.log("Check notification error:", error);
    }
  };

  // Bật hoặc tắt quyền notification
  const handleToggleNotifications = async (value) => {
    if (!value) {
      Alert.alert(
        "Tắt thông báo",
        "Bạn có thể tắt quyền thông báo trong phần Settings của điện thoại.",
        [{ text: "Đã hiểu" }],
      );
      return;
    }

    try {
      setLoading(true);

      let { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const result = await Notifications.requestPermissionsAsync();
        status = result.status;
      }

      if (status !== "granted") {
        Alert.alert(
          "Chưa cấp quyền",
          "Vui lòng bật quyền thông báo trong phần cài đặt của điện thoại.",
        );
        setNotificationEnabled(false);
        return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "TechShare Notifications",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
        });
      }

      setNotificationEnabled(true);

      Alert.alert("Thành công", "Bạn đã bật quyền thông báo cho TechShare.");
    } catch (error) {
      console.log("Enable notification error:", error);
      Alert.alert("Lỗi", "Không thể bật thông báo.");
    } finally {
      setLoading(false);
    }
  };

  // Gửi thông báo thử nghiệm
  const handleTestNotification = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Chưa bật thông báo",
          "Vui lòng bật quyền thông báo trước.",
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "TechShare 🔔",
          body: "Thông báo đang hoạt động bình thường!",
          sound: "default",
        },
        trigger: null,
      });

      Alert.alert("Thành công", "Đã gửi thông báo thử nghiệm.");
    } catch (error) {
      console.log("Test notification error:", error);
      Alert.alert("Lỗi", "Không thể gửi thông báo thử nghiệm.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Quản lý cài đặt ứng dụng của bạn</Text>
      </View>

      {/* Notification section */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconBox}>
            <Ionicons name="notifications-outline" size={24} color="#6366F1" />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <Text style={styles.description}>Nhận thông báo từ TechShare</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Enable Notifications</Text>
            <Text style={styles.settingDescription}>
              {notificationEnabled
                ? "Thông báo đã được cấp quyền"
                : "Cho phép ứng dụng gửi thông báo"}
            </Text>
          </View>

          <Switch
            value={notificationEnabled}
            onValueChange={handleToggleNotifications}
            disabled={loading}
            trackColor={{ false: "#D1D5DB", true: "#A5B4FC" }}
            thumbColor={notificationEnabled ? "#6366F1" : "#F9FAFB"}
          />
        </View>

        <View
          style={[
            styles.statusBox,
            notificationEnabled ? styles.enabledBox : styles.disabledBox,
          ]}
        >
          <Ionicons
            name={
              notificationEnabled ? "checkmark-circle" : "alert-circle-outline"
            }
            size={20}
            color={notificationEnabled ? "#16A34A" : "#D97706"}
          />

          <Text
            style={[
              styles.statusText,
              { color: notificationEnabled ? "#16A34A" : "#D97706" },
            ]}
          >
            {notificationEnabled
              ? "Notification is enabled"
              : "Notification is not enabled"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.testButton,
            !notificationEnabled && styles.disabledButton,
          ]}
          onPress={handleTestNotification}
          disabled={!notificationEnabled}
          activeOpacity={0.8}
        >
          <Ionicons name="paper-plane-outline" size={20} color="#FFFFFF" />
          <Text style={styles.testButtonText}>Test Notification</Text>
        </TouchableOpacity>
      </View>

      {/* App information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.aboutRow}>
          <View style={styles.aboutIcon}>
            <Ionicons name="phone-portrait-outline" size={21} color="#6366F1" />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.settingTitle}>TechShare</Text>
            <Text style={styles.settingDescription}>
              Device Rental Application
            </Text>
          </View>

          <Text style={styles.version}>v1.0.0</Text>
        </View>
      </View>

      <Text style={styles.footer}>TechShare © 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginTop: 15,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  headerText: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 18,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingInfo: {
    flex: 1,
    paddingRight: 12,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },

  settingDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },

  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  enabledBox: {
    backgroundColor: "#F0FDF4",
  },

  disabledBox: {
    backgroundColor: "#FFFBEB",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 8,
  },

  testButton: {
    flexDirection: "row",
    backgroundColor: "#6366F1",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  disabledButton: {
    backgroundColor: "#A5B4FC",
  },

  testButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  aboutIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  version: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
  },
});
