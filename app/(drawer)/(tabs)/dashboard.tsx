import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import { Button } from "@/src/components/common/button/Button";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import RevenueChart from "@/assets/icons/revenue-chart.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import PeriodSelector from "@/src/components/dashboard/PeriodSelector";
import { PeriodType } from "@/src/types/Dashboard";
import { AntDesign } from "@expo/vector-icons";
import InventoryAnalysis from "@/src/components/dashboard/analysis/InventoryAnalysis";
import { StatusBar } from "expo-status-bar";
import Icon from "@/src/components/common/Icon";

const DashboardScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [selectedStore, setselectedStore] = useState<string | null>(
    "스타벅스 청당점",
  );
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("일");

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    console.log(`Selected period: ${period}`);
  };

  return (
    <>
      <StatusBar style={"dark"} backgroundColor={"#fff"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ThemedView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.text}>
                사장님의{" "}
                <Text style={{ fontWeight: "bold" }}>{selectedStore}</Text>{" "}
                가게의 매출
              </Text>
              <View style={styles.revenueContainer}>
                <Text style={{ color: colors.success, ...styles.revenueText }}>
                  {(302532).toLocaleString()}
                </Text>
                <Text style={{ color: colors.text.primary }}>원</Text>
              </View>

              <Text style={styles.revenueInfo}>
                {"2025.05.12"} 매출현황 입니다.
              </Text>
            </View>

            {/* 매출 그래프 섹션*/}
            <View style={styles.revenueChartContainer}>
              <View style={styles.revenueChartHeader}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    icon={RevenueChart}
                    size={12}
                    style={{ marginRight: 4 }}
                    color={colors.primary["600"]}
                  />
                  <Text style={{ fontWeight: 600 }}>매출</Text>
                </View>
                <PeriodSelector
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={handlePeriodChange}
                />
              </View>

              <View style={styles.revenueChart}>
                <Text>{selectedPeriod} 단위 매출 그래프가 들어갈 예정.</Text>
              </View>

              <Button
                variant={"primary"}
                title="영수증으로 매출 입력하기"
                onPress={() => console.log("Go to OCR")}
                style={styles.goToOCRButton}
                icon={<AntDesign name="right" size={16} color="white" />}
              />
            </View>
            <InventoryAnalysis />
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background.primary,
    padding: 10,
    paddingVertical: 20,
  },
  text: {
    fontFamily: "Pretendard, Inter",
    fontSize: 11,
  },
  revenueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  revenueText: {
    fontFamily: "Pretendard, Inter",
    fontWeight: "bold",
    fontSize: 27,
    letterSpacing: 0,
  },
  revenueInfo: {
    fontFamily: "Pretendard, Inter",
    fontSize: 11,
    fontWeight: 300,
    color: Colors.light.text.weak,
  },
  revenueChartContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  revenueChartHeader: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  revenueChart: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.light.gray[200],
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  goToOCRButton: {
    backgroundColor: Colors.light.primary[300],
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 240,
    height: 32,
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: Colors.light.primary[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default DashboardScreen;
