import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import WebView from "react-native-webview";
import Icon from "../common/Icon";
import RevenueChart from "@/assets/icons/revenue-chart.svg";

const RevenueChartSection = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Icon icon={RevenueChart} size={12} color={colors.primary["600"]} />
          <Text style={styles.chartTitle}>매출</Text>
        </View>
        <View style={styles.chartControls}>
          <Text style={styles.chartControlText}>일</Text>
          <View style={styles.chartControlActive}>
            <Text style={styles.chartControlActiveText}>주</Text>
          </View>
          <Text style={styles.chartControlText}>월</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <WebView
          source={{ uri: `${process.env.EXPO_PUBLIC_WEBVIEW_URL}/charts` }}
          style={{ height: 300, width: "100%" }}
          scalesPageToFit
          javaScriptEnabled
          domStorageEnabled
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartSection: {
    marginBottom: 16,
    marginTop: 16,
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
    gap: 4,
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
    backgroundColor: Colors.light.background.secondary,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
});

export default RevenueChartSection;
