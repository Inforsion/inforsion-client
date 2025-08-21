import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Colors } from "@/src/constants/Colors";
import CreateRevenue from "@/src/components/revenue/CreateRevenue";
import ActionCardButton from "@/src/components/common/button/ActionCardButton";
import RevenueWidget from "@/src/components/revenue/RevenueWidget";
import RevenueChartSection from "@/src/components/revenue/RevenueChartSection";

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
  actionCards: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
});

export default RevenueScreen;
