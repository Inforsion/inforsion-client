import WebView from "react-native-webview";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              color="#009688"
              size="large"
              style={{ flex: 1 }}
            />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: Colors.light.background.secondary,
    height: 200,
    width: "100%",
    overflow: "hidden",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.background.secondary,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.light.text.secondary,
    fontWeight: "500",
  },
});

export default ChartWebView;
