import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Colors } from "@/src/constants/Colors";
import StatusBarCover from "@/src/components/ui/IOSStatusBarCover";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBarCover insets={insets} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.success,
          tabBarInactiveTintColor: colors.gray["50"],
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            },
            default: {
              backgroundColor: "#FFFFFF",
              borderTopColor: "#E0E0E0",
              borderTopWidth: 1,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "대시보드",
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return <Image source={require("@/assets/icons/home.svg")} />;
              } else {
                return (
                  <Image source={require("@/assets/icons/home-active.svg")} />
                );
              }
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="revenue"
          options={{
            title: "매출",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="calendar-outline"
                size={size || 28}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: "재고",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="chatbubbles-outline"
                size={size || 28}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="operation"
          options={{
            title: "운영",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size || 28} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
