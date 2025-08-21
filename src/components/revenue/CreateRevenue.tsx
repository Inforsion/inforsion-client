import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/Colors";
import Row from "@/src/components/revenue/Row";
import { AntDesign } from "@expo/vector-icons";

interface CreateRevenueProps {
  toggleCreateRevenue: () => void;
}

const CreateRevenue = ({ toggleCreateRevenue }: CreateRevenueProps) => {
  const NoRevenue = () => {
    return (
      <View>
        <Text
          style={{
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
          }}
        >
          입력하기
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={toggleCreateRevenue}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="arrowleft" size={16} color="black" />
          <Text
            style={{
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
          >
            작성 취소
          </Text>
        </View>
      </TouchableOpacity>
      {/* 매출 */}
      <Row label={"매출"} value={302532} isHeader={true}></Row>
      <Row label={"카드"} value={302000}></Row>
      <Row label={"현금"} value={500}></Row>

      <View style={styles.row}>
        <Text style={styles.label}>기타</Text>
        <NoRevenue />
      </View>
      {/* 원가 */}
      <Row label={"원가"} value={302532} isHeader={true}></Row>
      <Row label={"재료비"} value={302000}></Row>
      <Row label={"고정비"} value={302000}></Row>

      {/* 세금 */}
      <Row label={"세금"} value={30253} isHeader></Row>
      <Row label={"부가세"} value={30253}></Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border.primary,
  },
  label: {
    fontSize: 16,
    color: Colors.light.text.secondary,
    fontWeight: "600",
  },
  labelHead: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text.primary,
  },
  value: {
    fontSize: 16,
    color: Colors.light.text.secondary,
    fontWeight: "600",
  },
  valueHead: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text.primary,
  },
});

export default CreateRevenue;
