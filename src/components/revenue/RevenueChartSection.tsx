import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import Icon from "../common/Icon";
import RevenueChart from "@/assets/icons/revenue-chart.svg";
import ChartWebView from "@/src/components/webview/ChartWebView";
import { DailyData } from "@/src/types/Revenue";

type PeriodType = "일" | "주" | "월";

const RevenueChartSection = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [selectedTimeframe, setSelectedTimeframe] = useState<PeriodType>("주");
  const webviewBaseURL = `${process.env.EXPO_PUBLIC_WEBVIEW_URL}`;
  const [chartURL, setChartURL] = useState(webviewBaseURL);

  const toggleTimeframe = (timeframe: "일" | "주" | "월") => {
    setSelectedTimeframe(timeframe);
  };

  // todo: 날짜 데이터 타입 제대로, 실제 데이터로 교체 예정
  const props: DailyData = {
    data: [
      { date: "2024-08-19", revenue: 25 },
      { date: "2024-08-20", revenue: 30 },
      { date: "2024-08-21", revenue: 28 },
      { date: "2024-08-22", revenue: 35 },
      { date: "2024-08-23", revenue: 32 },
      { date: "2024-08-24", revenue: 29 },
      { date: "2024-08-25", revenue: 33 },
    ],
  };

  useEffect(() => {
    const url =
      webviewBaseURL +
      `/charts?timeframe=${selectedTimeframe}&data=${decodeURIComponent(JSON.stringify(props.data))}`;
    setChartURL(url);
  }, [selectedTimeframe]);

  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Icon icon={RevenueChart} size={12} color={colors.primary["600"]} />
          <Text style={styles.chartTitle}>매출</Text>
        </View>
        <View style={styles.chartControls}>
          <TouchableOpacity
            onPress={() => toggleTimeframe("일")}
            style={
              selectedTimeframe === "일"
                ? styles.chartControlActive
                : styles.chartControl
            }
          >
            <Text
              style={
                selectedTimeframe === "일"
                  ? styles.chartControlActiveText
                  : styles.chartControlText
              }
            >
              일
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleTimeframe("주")}
            style={
              selectedTimeframe === "주"
                ? styles.chartControlActive
                : styles.chartControl
            }
          >
            <Text
              style={
                selectedTimeframe === "주"
                  ? styles.chartControlActiveText
                  : styles.chartControlText
              }
            >
              주
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleTimeframe("월")}
            style={
              selectedTimeframe === "월"
                ? styles.chartControlActive
                : styles.chartControl
            }
          >
            <Text
              style={
                selectedTimeframe === "월"
                  ? styles.chartControlActiveText
                  : styles.chartControlText
              }
            >
              월
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ChartWebView url={chartURL} />
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
  chartControl: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
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
