// src/styles/splashStyles.ts
import { StyleSheet } from "react-native";

export const SPLASH_BG = "#3653A4";

const splashStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SPLASH_BG,
        paddingTop: 60,
    },
    center: {
        flex: 1,
    },
    title: {
        marginTop: 8,
        marginLeft: 20,
        fontSize: 36,
        color: "#fff",
        fontFamily: "Pretendard",
        fontWeight: "600",
    },
    step: {
        position: "absolute",
        bottom: 200,
        alignSelf: "center",
    },
    logo: {
        position: "absolute",
        width: 130,
        height: 30,
        bottom: 40,
        alignSelf: "center",
    },
});

export default splashStyles;
