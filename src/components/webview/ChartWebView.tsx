import WebView from "react-native-webview";
import { StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";

interface ChartWebViewProps {
  url: string;
}

const ChartWebView = ({ url }: ChartWebViewProps) => {
  return (
    <View style={styles.chartContainer}>
      <WebView
        source={{
          uri: url,
        }}
        style={{ height: 300, width: "100%" }}
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: Colors.light.background.secondary,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default ChartWebView;
