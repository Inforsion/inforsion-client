import React from "react";
import { View, Text } from "react-native";
import { ingrStyles } from "@/src/styles/IngrStyle";


type StepIndicatorProps = {
    currentStep: number;
    totalSteps?: number;
};

const StepIndicator = ({ currentStep, totalSteps = 2 }: StepIndicatorProps) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <View style={ingrStyles.stepWrapper}>
            {steps.map((n) => {
                const isActive = n === currentStep;
                return (
                    <View
                        key={n}
                        style={[
                            ingrStyles.stepCircle,
                            { backgroundColor: isActive ? '#2897FF' : '#D9D9D9' },
                        ]}
                    >
                        <Text
                            style={[
                                ingrStyles.stepText,
                                isActive
                                    ? { color: '#fff' }
                                    : { color: '#fff', fontWeight: 'bold' },
                            ]}
                        >
                            {n}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default StepIndicator;
