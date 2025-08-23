import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import RevenueInput from "@/src/components/revenue/RevenueInput";
import { useState } from "react";

interface RowProps {
  label: string;
  value: number | null;
  setValue: (label: string, value: number | null) => void;
  isHeader?: boolean;
}

const Row = ({ label, value, setValue, isHeader = false }: RowProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const labelStyle = isHeader ? styles.labelHead : styles.label;
  const valueStyle = isHeader ? styles.valueHead : styles.value;
  const rowStyle = isHeader ? styles.rowHead : styles.row;

  return (
    <View style={rowStyle}>
      <Text style={labelStyle}>{label}</Text>
      {isEditing ? (
        <RevenueInput
          label={label}
          value={value}
          setValue={setValue}
          editMode={isEditing}
          toggleEditing={() => setIsEditing(false)}
        />
      ) : (
        <TouchableOpacity
          onPress={isHeader ? () => {} : () => setIsEditing(true)}
          disabled={isHeader}
        >
          <Text style={[valueStyle, value === null && styles.labelNull]}>
            {value === null ? "입력하기" : value.toLocaleString() + "원"}
          </Text>
        </TouchableOpacity>
      )}
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
  labelNull: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text.secondary,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

export default Row;
