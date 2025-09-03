import React from "react";
import { View, Text, StyleSheet } from "react-native";


type StepIndicatorProps = {
    currentStep: number;
    totalSteps?: number;
};

const StepIndicator = ({ currentStep, totalSteps = 2 }: StepIndicatorProps) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <View style={styles.wrapper}>
            {steps.map((n) => {
                const isActive = n === currentStep;
                return (
                    <View
                        key={n}
                        style={[
                            styles.circle,
                            { backgroundColor: isActive ? '#2897FF' : '#D9D9D9' },
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
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

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#268AFF",
        marginRight: 8,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});