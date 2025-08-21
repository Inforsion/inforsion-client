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
import HomeSVG from "@/assets/icons/home.svg";
import HomeActiveSVG from "@/assets/icons/home-active.svg";
import RevenueSVG from "@/assets/icons/revenue.svg";
import RevenueActiveSVG from "@/assets/icons/revenue-active.svg";
import InventorySVG from "@/assets/icons/inventory.svg";
import InventoryActiveSVG from "@/assets/icons/inventory-active.svg";
import OperationSVG from "@/assets/icons/operation.svg";
import OperationActiveSVG from "@/assets/icons/operation-active.svg";
import IOSStatusBarCover from "@/src/components/ui/IOSStatusBarCover";
import Icon from "@/src/components/common/Icon";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <>
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
                return <Icon icon={HomeActiveSVG} size={size} />;
              } else {
                return <Icon icon={HomeSVG} size={size} />;
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
                return <Icon icon={RevenueActiveSVG} size={size} />;
              } else {
                return <Icon icon={RevenueSVG} size={size} />;
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
                return <Icon icon={InventoryActiveSVG} size={size} />;
              } else {
                return <Icon icon={InventorySVG} size={size} />;
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
                return <Icon icon={OperationActiveSVG} size={size} />;
              } else {
                return <Icon icon={OperationSVG} size={size} />;
              }
            },
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
