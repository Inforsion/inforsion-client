// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/src/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
  });
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isStoreLoading, setIsStoreLoading] = useState(true);

  // 저장된 가게 정보 불러오기
  useEffect(() => {
    loadSelectedStore();
  }, []);

  // 라우팅 로직
  useEffect(() => {
    if (!loaded || isStoreLoading) return;

    const inStoresScreen = segments[0] === "stores";
    const inTabsScreen = segments[0] === "(tabs)";

    if (!selectedStore && !inStoresScreen) {
      // 가게가 선택되지 않았고 stores 화면이 아니면 stores로 이동
      router.replace("/stores");
    } else if (selectedStore && inStoresScreen && segments.length === 1) {
      // 가게가 선택되었고 stores 화면(변경 모드가 아닌)에 있으면 tabs로 이동
      router.replace("/(tabs)");
    }
  }, [selectedStore, loaded, isStoreLoading, segments]);

  const loadSelectedStore = async () => {
    try {
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="stores"
          options={{
            title: selectedStore ? "가게 변경" : "가게 선택",
            headerShown: !!selectedStore,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
