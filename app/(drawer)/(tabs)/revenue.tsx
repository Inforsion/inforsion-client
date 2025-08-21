import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

const { width: screenWidth } = Dimensions.get("window");

interface DashboardData {
  totalSales: number;
  profit: number;
  change: number;
  changeDate: string;
}

const RevenueScreen: React.FC = () => {
  const data: DashboardData = {
    totalSales: 302532,
    profit: 115620,
    change: -23200,
    changeDate: "2025.05.12",
  };

  // 차트 데이터
  const chartData = {
    labels: [
      "05. 06(월)",
      "05. 07(화)",
      "05. 08(수)",
      "05. 09(목)",
      "05. 10(금)",
      "05. 11(토)",
      "05. 12(일)",
    ],
    datasets: [
      {
        data: [25, 28, 22, 30, 45, 35, 28],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.light.background.primary,
    backgroundGradientFrom: Colors.light.background.primary,
    backgroundGradientTo: Colors.light.background.primary,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(40, 151, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(197, 198, 204, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "0",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: Colors.light.gray[200],
      strokeWidth: 1,
    },
    barPercentage: 0.7,
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const isPositiveChange = data.change >= 0;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Sales Overview */}
          <View style={styles.salesOverviewContainer}>
            <View style={styles.salesOverview}>
              <View style={styles.salesItem}>
                <Text style={styles.salesLabel}>일 매출</Text>
                <Text style={styles.salesValue}>
                  {formatNumber(data.totalSales)}원
                </Text>
              </View>

              <View style={styles.salesItem}>
                <Text style={styles.salesLabel}>순이익</Text>
                <Text style={styles.salesValue}>
                  {formatNumber(data.profit)}원
                </Text>
              </View>
            </View>
            {/* Change Indicator */}
            <View style={styles.changeContainer}>
              <Text
                style={[
                  styles.changeValue,
                  {
                    color: isPositiveChange
                      ? Colors.light.success
                      : Colors.light.error,
                  },
                ]}
              >
                {isPositiveChange ? "+" : ""}
                {formatNumber(data.change)}원
              </Text>
              <Text style={styles.changeDate}>{data.changeDate} 기준</Text>
            </View>
          </View>
          {/* Action Cards */}
          <View style={styles.actionCards}>
            <View
              style={[
                styles.actionCard,
                { backgroundColor: Colors.light.primary[300] },
              ]}
            >
              <Text style={styles.actionCardTitle}>매출 저장하기 / 기기</Text>
              <Text style={styles.actionCardSubtitle}>
                오늘의 매출을 기다려주고{"\n"}수정할 수 있습니다.
              </Text>
            </View>

            <View
              style={[
                styles.actionCard,
                { backgroundColor: Colors.light.primary[300] },
              ]}
            >
              <Text style={styles.actionCardTitle}>영수증 등록하기 / 기기</Text>
              <Text style={styles.actionCardSubtitle}>
                영수증 촬영으로 자동적 매출기록{"\n"}입력할 수 있습니다.
              </Text>
            </View>
          </View>
          {/* Chart Section */}
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

            <View style={styles.chartContainer}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  salesOverviewContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.light.border.primary,
  },
  salesOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 12,
  },
  salesItem: {
    flex: 1,
  },
  salesLabel: {
    fontSize: 14,
    color: Colors.light.text.secondary,
    marginBottom: 4,
  },
  salesValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text.primary,
  },
  changeContainer: {
    marginBottom: 24,
  },
  changeValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  changeDate: {
    fontSize: 12,
    color: Colors.light.text.secondary,
  },
  actionCards: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  actionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    minHeight: 80,
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text.inverse,
    marginBottom: 8,
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: Colors.light.text.inverse,
    lineHeight: 16,
    opacity: 0.9,
  },
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
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
});

export default RevenueScreen;
