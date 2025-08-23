import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import Row from "@/src/components/revenue/Row";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

interface CreateRevenueProps {
  toggleCreateRevenue: () => void;
}

interface RevenueData {
  매출합계: number | null;
  카드: number | null;
  현금: number | null;
  기타: number | null;
  원가합계: number | null;
  재료비: number | null;
  고정비: number | null;
  세금합계: number | null;
  부가세: number | null;
}

type Data = RowHeaderData[];

interface RowHeaderData extends RowData {
  subRows: RowData[];
}

interface RowData {
  label: string;
  value: number | null;
}

const CreateRevenue = ({ toggleCreateRevenue }: CreateRevenueProps) => {
  const mockData = {
    매출합계: 302532,
    카드: 302032,
    현금: 500,
    기타: 0,
    원가합계: 322,
    재료비: 322,
    고정비: null,
    세금합계: 0,
    부가세: 0,
  };

  const [revenueData, setRevenueData] = useState<Data>([
    {
      label: "매출합계",
      value: mockData.매출합계,
      subRows: [
        { label: "카드", value: mockData.카드 },
        { label: "현금", value: mockData.현금 },
        { label: "기타", value: mockData.기타 },
      ],
    },
    {
      label: "원가합계",
      value: 0,
      subRows: [
        { label: "재료비", value: mockData.재료비 },
        { label: "고정비", value: mockData.고정비 },
      ],
    },
    {
      label: "세금합계",
      value: 0,
      subRows: [{ label: "부가세", value: 0 }],
    },
  ]);

  const setValue = (label: string, value: number | null) => {
    const row = revenueData.find((row) =>
      row.subRows.find((row) => row.label === label),
    );
    if (!row) {
      throw new Error(`${label}을 가진 행을 찾을 수 없습니다.`);
    }

    const updatedSubRows = row.subRows.map((subRow) => {
      if (subRow.label === label) {
        return { ...subRow, value: value };
      }
      return subRow;
    });

    const updatedData = revenueData.map((rowHead) => {
      if (rowHead.label === row.label) {
        return {
          ...rowHead,
          value: updatedSubRows.reduce(
            (acc, cur) => (acc += cur.value || 0),
            0,
          ),
          subRows: updatedSubRows,
        };
      }
      return rowHead;
    });
    setRevenueData(updatedData);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={toggleCreateRevenue}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="arrowleft" size={16} color="black" />
          <Text>작성 취소</Text>
        </View>
      </TouchableOpacity>
      {revenueData.map((row) => (
        <View key={row.label}>
          <Row
            key={row.label}
            label={row.label}
            value={row.value}
            setValue={setValue}
            isHeader
          />
          {row.subRows.map((subRow) => (
            <Row
              key={subRow.label}
              label={subRow.label}
              value={subRow.value}
              setValue={setValue}
            />
          ))}
        </View>
      ))}
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
