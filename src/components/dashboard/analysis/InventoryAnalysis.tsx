import { Colors } from "@/src/constants/Colors";
import { StyleSheet, Text, View, Image } from "react-native";
import ChartImage from "../../../../assets/images/chart/mock/img.png";
import ChartWebView from "@/src/components/webview/ChartWebView";

const InventoryAnalysis = () => {
  const 분석결과 = {
    title: "바닐라 시럽 30개 정도 필요해요",
    description: "오늘 하루동안 많이 사용될 예상재고",
    date: "2025.08.18",
  };

  const baseURL = process.env.EXPO_PUBLIC_WEBVIEW_URL;
  const chartURL =
    baseURL +
    '/charts/inventory?timeframe=일&data=[{"date":"2025-08-01","inventoryConsumed":100},{"date":"2025-08-02","inventoryConsumed":200},{"date":"2025-08-03","inventoryConsumed":150},{"date":"2025-08-04","inventoryConsumed":300},{"date":"2025-08-05","inventoryConsumed":250},{"date":"2025-08-06","inventoryConsumed":400},{"date":"2025-08-07","inventoryConsumed":350}]';

  return (
    <View style={styles.container}>
      <Text style={styles.description}>오늘 하루동안 많이 사용될 예상재고</Text>
      <Text style={styles.title} aria-label={"분석 결과"}>
        {분석결과.title}
      </Text>
      <Text style={styles.date}>
        {분석결과.date} 가장 많이 사용된 재고입니다.
      </Text>
      <View style={styles.chart}>
        {/*  최근 1주간 가장  많이 팔린 재고의 양 차트*/}
        <ChartWebView url={chartURL} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background.tertiary,
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    fontFamily: "Pretendard",
    letterSpacing: 0,
    color: Colors.light.primary["300"],
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Pretendard",
    color: Colors.light.text.primary,
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    fontFamily: "Pretendard",
    color: Colors.light.text.weak,
  },
  chart: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.light.gray[200],
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
});

export default InventoryAnalysis;
