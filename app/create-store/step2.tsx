import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import StepIndicator from "@/src/components/Ingr/StepIndicator";
import useCreateStore from "@/hooks/stores/useCreateStore";
import NavigationButtons from "@/src/components/common/button/NavigationButtons";
import Step2Content from "@/src/components/store/create/Step2Content";

export default function Step2Screen() {
  const { storeForm, updateStoreForm } = useCreateStore();

  const stepData = {
    title: "비밀번호 설정",
    description: "새로운 가게 비밀번호 (5자리)를 입력해주세요",
    content: (
      <Step2Content storeForm={storeForm} handleChange={updateStoreForm} />
    ),
    handleNext: () => router.push("/create-store/step2"),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StepIndicator maxSteps={3} currentStep={1} />

        <View style={styles.header}>
          <Text style={styles.title}>{stepData.title}</Text>
          <Text style={styles.description}>{stepData.description}</Text>
        </View>

        <View style={styles.content}>{stepData.content}</View>
        <NavigationButtons
          onNext={stepData.handleNext}
          canGoNext={true}
          nextLabel={"다음"}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 20,
    color: "#000",
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    color: "#666",
  },
  content: {
    flex: 1,
  },
});
