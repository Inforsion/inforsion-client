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
import { useState } from "react";
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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="stores"
          options={{
            title: selectedStore ? "가게 변경" : "가게 선택",
            headerShown: !!selectedStore,
          }}
        />
        <Stack.Screen
          name="(drawer)"
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="splash_intro" options={{headerShown: false}} />
        <Stack.Screen name="ingr" options={{headerShown: false}} />


      </Stack>
      <StatusBar backgroundColor={"#fff"} />
    </ThemeProvider>
  );
}
