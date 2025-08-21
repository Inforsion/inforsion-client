import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import CreateRevenue from "@/src/components/revenue/CreateRevenue";

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

  const [isCreateRevenueVisible, setIsCreateRevenueVisible] = useState(false);

  const toggleCreateRevenue = () => {
    setIsCreateRevenueVisible(!isCreateRevenueVisible);
  };

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
                  {formatNumber(data.totalSales)}
                  <Text style={styles.wonValueText}>원</Text>
                </Text>
              </View>

              <View style={styles.salesItem}>
                <Text style={styles.salesLabel}>순이익</Text>
                <Text style={styles.salesValue}>
                  {formatNumber(data.profit)}
                  <Text style={styles.wonValueText}>원</Text>
                </Text>
              </View>
            </View>
            {/* Change Indicator */}
            <View style={styles.changeContainer}>
              <View style={styles.salesOverview}>
                <View>
                  <Text style={styles.salesLabel}>환불 금액</Text>
                  <Text
                    style={[
                      styles.salesValue,
                      {
                        color: isPositiveChange
                          ? Colors.light.success
                          : Colors.light.error,
                      },
                    ]}
                  >
                    {isPositiveChange ? "+" : ""}
                    {formatNumber(data.change)}
                    <Text style={styles.wonValueText}>원</Text>
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.changeDate}>{data.changeDate} 기준</Text>
                </View>
              </View>
            </View>
          </View>
          {isCreateRevenueVisible ? (
            <CreateRevenue />
          ) : (
            <>
              <View style={styles.actionCards}>
                <TouchableOpacity
                  onPress={toggleCreateRevenue}
                  style={[
                    styles.actionCard,
                    { backgroundColor: Colors.light.primary[300] },
                  ]}
                >
                  <Text style={styles.actionCardTitle}>
                    매출 작성하러 가기
                    <Entypo name="chevron-thin-right" size={12} color="white" />
                  </Text>
                  <Text style={styles.actionCardSubtitle}>
                    오늘의 매출을 어디서든 기록하고 수정할 수 있습니다.
                  </Text>
                </TouchableOpacity>

                <View
                  style={[
                    styles.actionCard,
                    { backgroundColor: Colors.light.primary[300] },
                  ]}
                >
                  <Text style={styles.actionCardTitle}>
                    영수증 촬영하러 가기
                    <Entypo name="chevron-thin-right" size={12} color="white" />
                  </Text>
                  <Text style={styles.actionCardSubtitle}>
                    영수증 촬영으로 간편한 매출/재고 관리를 할 수 있습니다.
                  </Text>
                </View>
              </View>

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
            </>
          )}
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
    paddingVertical: 32,
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
    marginTop: 16,
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
  wonValueText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.text.weak,
  },
  changeContainer: {
    marginBottom: 12,
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
