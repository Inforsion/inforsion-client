import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";

interface RowProps {
  label: string;
  value: number;
  isHeader?: boolean;
}

const Row = ({ label, value, isHeader = false }: RowProps) => {
  const labelStyle = isHeader ? styles.labelHead : styles.label;
  const valueStyle = isHeader ? styles.valueHead : styles.value;
  const rowStyle = isHeader ? styles.rowHead : styles.row;

  return (
    <View style={rowStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={valueStyle}>{value.toLocaleString()}원</Text>
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

export default Row;
