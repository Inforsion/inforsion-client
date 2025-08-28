import { Colors } from "@/src/constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";

const useCreateStoreStyle = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingHorizontal: 20,
      paddingTop: 48,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontWeight: "700",
      marginBottom: 4,
      fontSize: 20,
      color: "#000",
    },
    description: {
      fontWeight: "400",
      fontSize: 12,
      color: "#666",
    },
    content: {
      flex: 1,
    },
  });
};

export default useCreateStoreStyle;
