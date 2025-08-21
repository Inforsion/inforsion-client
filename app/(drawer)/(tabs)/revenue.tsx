import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import CreateRevenue from "@/src/components/revenue/CreateRevenue";
import ActionCardButton from "@/src/components/common/button/ActionCardButton";
import RevenueWidget from "@/src/components/revenue/RevenueWidget";
import RevenueChartSection from "@/src/components/revenue/RevenueChartSection";

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

  const [isCreateRevenueVisible, setIsCreateRevenueVisible] = useState(false);

  const toggleCreateRevenue = () => {
    setIsCreateRevenueVisible(!isCreateRevenueVisible);
  };

  const actions = [
    {
      title: "매출 작성하러가기",
      subTitle: "오늘의 매출을 어디서든 기록하고 수정할 수 있습니다.",
      onPress: toggleCreateRevenue,
    },
    {
      title: "영수증 촬영하러 가기",
      subTitle: "영수증 촬영으로 간편한 매출/재고 관리를 할 수 있습니다.",
      onPress: () => {},
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Sales Overview */}
          <RevenueWidget data={data} />
          {isCreateRevenueVisible ? (
            <CreateRevenue toggleCreateRevenue={toggleCreateRevenue} />
          ) : (
            <>
              <View style={styles.actionCards}>
                {actions.map((action) => (
                  <ActionCardButton
                    key={action.title}
                    title={action.title}
                    subTitle={action.subTitle}
                    onPress={action.onPress}
                  />
                ))}
              </View>
              <RevenueChartSection />
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

export default RevenueScreen;
