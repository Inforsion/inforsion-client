import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import React from "react";
interface DashboardData {
  totalSales: number;
  profit: number;
  change: number;
  changeDate: string;
}

interface RevenueWidgetProps {
  data: DashboardData;
}

const RevenueWidget = ({ data }: RevenueWidgetProps) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };
  const isPositiveChange = data.change >= 0;

  return (
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
  );
};
const styles = StyleSheet.create({
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
  changeDate: {
    fontSize: 12,
    color: Colors.light.text.secondary,
    marginTop: 4,
  },
});

export default RevenueWidget;
