import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Colors } from "@/src/constants/Colors";
import Sidebar from "@/src/components/common/Sidebar";
import InforsionHeader from "@/src/components/ui/InforsionHeader";
import IOSStatusBarCover from "@/src/components/ui/IOSStatusBarCover";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <IOSStatusBarCover insets={insets} />
      <Drawer
        drawerContent={() => <Sidebar />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            header: () => <InforsionHeader />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
