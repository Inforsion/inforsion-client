import React from "react";
import { View, Text } from "react-native";
import { ingrStyles } from "@/src/styles/IngrStyle";

interface StepIndicatorProps {
  currentStep?: number;
  maxSteps?: number;
}

const StepIndicator = ({
  currentStep = 1,
  maxSteps = 2,
}: StepIndicatorProps) => (
  <View style={ingrStyles.stepWrapper}>
    {Array(maxSteps)
      .fill(0)
      .map((_, index) => (
        <View
          key={index}
          style={[
            ingrStyles.stepCircle,
            {
              backgroundColor: index <= currentStep ? "#268AFF" : "#E0E0E0",
            },
          ]}
        >
          <Text
            style={{
              color: index <= currentStep ? "#FFFFFF" : "#A0A0A0",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </Text>
        </View>
      ))}
  </View>
);

export default StepIndicator;
