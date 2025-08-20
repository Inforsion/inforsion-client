import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Colors } from "@/src/constants/Colors";
import StatusBarCover from "@/src/components/ui/IOSStatusBarCover";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import HomeSVG from "../../assets/icons/home.svg";
import HomeActiveSVG from "@/assets/icons/home-active.svg";
import RevenueSVG from "../../assets/icons/revenue.svg";
import RevenueActiveSVG from "@/assets/icons/revenue-active.svg";
import InventorySVG from "../../assets/icons/inventory.svg";
import InventoryActiveSVG from "@/assets/icons/inventory-active.svg";
import OperationSVG from "../../assets/icons/operation.svg";
import OperationActiveSVG from "@/assets/icons/operation-active.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBarCover insets={insets} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary["600"],
          tabBarInactiveTintColor: colors.inactive,
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
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={HomeActiveSVG}
                  />
                );
              } else {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={HomeSVG}
                  />
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
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={RevenueActiveSVG}
                  />
                );
              } else {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={RevenueSVG}
                  />
                );
              }
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: "재고",
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={InventoryActiveSVG}
                  />
                );
              } else {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={InventorySVG}
                  />
                );
              }
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="operation"
          options={{
            title: "운영",
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={OperationActiveSVG}
                  />
                );
              } else {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={OperationSVG}
                  />
                );
              }
            },
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
