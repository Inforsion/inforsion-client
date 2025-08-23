import { StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";

const ITEM_WIDTH = 150;
const ITEM_SPACING = 10;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;

const storeStyles = (SCREEN_WIDTH: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      backgroundColor: "#3653A4",
      justifyContent: "center",
      alignItems: "center",
    },
    storeList: {
      flex: 1,
    },
    scrollContent: {
      alignItems: "center",
      paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
      paddingVertical: 30,
    },
    storeWrapper: {
      width: TOTAL_ITEM_WIDTH,
      alignItems: "center",
      justifyContent: "center",
    },
    storeItem: {
      width: ITEM_WIDTH,
      height: ITEM_WIDTH,
      borderRadius: ITEM_WIDTH / 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    storeImage: {
      justifyContent: "center",
      alignItems: "center",
      width: ITEM_WIDTH,
      height: ITEM_WIDTH,
      borderRadius: ITEM_WIDTH / 2,
    },
    logo: {
      position: "absolute",
      width: 100,
      height: 24,
      bottom: 40,
    },
    alertContainer: {
      position: "absolute",
      bottom: 100,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    alertText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
    },
    errorText: {
      color: Colors.light.error,
      fontSize: 14,
      textAlign: "center",
      flexWrap: "wrap",
      maxWidth: "55%",
    },
  });
};

export default storeStyles;
