// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/src/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isStoreLoading, setIsStoreLoading] = useState(true);

  // 저장된 가게 정보 불러오기
  useEffect(() => {
    loadSelectedStore();
  }, []);

  const loadSelectedStore = async () => {
    try {
      const storeId = await AsyncStorage.getItem("selectedStore");
      setSelectedStore(storeId);
    } catch (error) {
      console.error("Error loading selected store:", error);
    } finally {
      setIsStoreLoading(false);
    }
  };

  if (!loaded || isStoreLoading) {
    return null; // 또는 로딩 스피너
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {selectedStore ? (
          // 가게가 선택된 경우 메인 앱
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="stores" options={{ title: "가게 변경" }} />
          </>
        ) : (
          <Stack.Screen
            name="stores"
            options={{ title: "가게 선택", headerShown: false }}
          />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
