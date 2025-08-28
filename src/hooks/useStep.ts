import React, { useState } from "react";
import { Alert } from "react-native";

interface Step {
  title: string;
  description: string;
  content?: React.ReactNode;
  validate?: () => boolean;
}

const useStep = (steps: Step[], handleSubmit: () => void) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      if (steps[currentStep].validate && !steps[currentStep].validate()) {
        Alert.alert("필수 항목을 입력해주세요.");
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      handleSubmit();
    }
  };

  return { currentStep, goToNextStep };
};

export default useStep;
