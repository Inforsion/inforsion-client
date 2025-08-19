import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { PeriodType } from "@/src/types/Dashboard";

interface PeriodSelectorProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  style?: any;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  style,
}) => {
  const periods: PeriodType[] = ["일", "주", "월"];

  return (
    <View style={[styles.container, style]}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period}
          style={[
            styles.radioButton,
            selectedPeriod === period && styles.selectedRadioButton,
          ]}
          onPress={() => onPeriodChange(period)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.radioText,
              selectedPeriod === period && styles.selectedRadioText,
            ]}
          >
            {period}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 2,
  },
  radioButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioButton: {
    backgroundColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  radioText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  selectedRadioText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default PeriodSelector;
