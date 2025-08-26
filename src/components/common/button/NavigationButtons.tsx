import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Colors } from "@/src/constants/Colors";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev?: () => void;
  canGoNext: boolean;
  canGoPrev?: boolean;
  nextLabel: string;
  prevLabel?: string;
  disabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrev,
  canGoNext,
  canGoPrev = false,
  nextLabel,
  prevLabel,
  disabled = false,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.buttonContainer}>
      {canGoPrev && onPrev && (
        <TouchableOpacity
          style={[
            styles.backButton,
            { borderColor: colors.primary[500] },
            disabled && styles.disabledButton,
          ]}
          onPress={onPrev}
          disabled={disabled}
        >
          <Text
            style={[
              styles.backButtonText,
              { color: colors.primary[500] },
              disabled && styles.disabledText,
            ]}
          >
            {prevLabel || "이전"}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          styles.nextButton,
          {
            backgroundColor:
              canGoNext && !disabled ? colors.primary[500] : colors.gray[300],
            flex: 1,
            marginLeft: canGoPrev ? 12 : 0,
          },
        ]}
        onPress={onNext}
        disabled={!canGoNext || disabled}
      >
        <Text
          style={[
            styles.nextButtonText,
            {
              color:
                canGoNext && !disabled
                  ? colors.text.inverse
                  : colors.text.secondary,
            },
          ]}
        >
          {nextLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingBottom: 30,
  },
  backButton: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  nextButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default NavigationButtons;
