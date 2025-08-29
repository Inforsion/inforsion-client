import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Colors } from "@/src/constants/Colors";
import HomeSVG from "@/assets/icons/home.svg";
import HomeActiveSVG from "@/assets/icons/home-active.svg";
import RevenueSVG from "@/assets/icons/revenue.svg";
import RevenueActiveSVG from "@/assets/icons/revenue-active.svg";
import InventorySVG from "@/assets/icons/inventory.svg";
import InventoryActiveSVG from "@/assets/icons/inventory-active.svg";
import OperationSVG from "@/assets/icons/operation.svg";
import OperationActiveSVG from "@/assets/icons/operation-active.svg";
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
            title: "홈",
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return <Icon icon={HomeActiveSVG} size={size} color={color} />;
              } else {
                return <Icon icon={HomeSVG} size={size} color={color} />;
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
                  <Icon icon={RevenueActiveSVG} size={size} color={color} />
                );
              } else {
                return <Icon icon={RevenueSVG} size={size} color={color} />;
              }
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="recipe"
          options={{
            title: "상품",
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return (
                  <Icon icon={InventoryActiveSVG} size={size} color={color} />
                );
              } else {
                return <Icon icon={InventorySVG} size={size} color={color} />;
              }
            },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="ingr"
          options={{
            title: "재료",
            tabBarIcon: ({ color, focused, size }) => {
              if (focused) {
                return (
                  <Icon icon={OperationActiveSVG} size={size} color={color} />
                );
              } else {
                return <Icon icon={OperationSVG} size={size} color={color} />;
              }
            },
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
