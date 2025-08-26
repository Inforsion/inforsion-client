import { Stack } from "expo-router";
import { useEffect } from "react";
import useCreateStoreStore from "@/src/stores/store/useCreateStoreStore";

export default function CreateStoreLayout() {
  const resetForm = useCreateStoreStore((state) => state.resetStoreForm);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
    </Stack>
  );
}
