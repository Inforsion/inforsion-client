import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import WebView from "react-native-webview";

const RevenueChartSection = () => {
  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>매출 그래프</Text>
        <View style={styles.chartControls}>
          <Text style={styles.chartControlText}>일</Text>
          <View style={styles.chartControlActive}>
            <Text style={styles.chartControlActiveText}>주</Text>
          </View>
          <Text style={styles.chartControlText}>월</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text>차트</Text>
      </View>
      <WebView
        source={{ uri: "https://shipfriend.dev" }}
        style={{ height: 300, width: "100%" }}
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartSection: {
    marginBottom: 32,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text.primary,
  },
  chartControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  chartControlText: {
    fontSize: 14,
    color: Colors.light.text.secondary,
  },
  chartControlActive: {
    backgroundColor: Colors.light.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  chartControlActiveText: {
    fontSize: 14,
    color: Colors.light.text.inverse,
    fontWeight: "500",
  },
  chartContainer: {
    alignItems: "center",
    backgroundColor: Colors.light.background.secondary,
    paddingVertical: 16,
    height: 200,
    borderRadius: 12,
    justifyContent: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
});

export default RevenueChartSection;
