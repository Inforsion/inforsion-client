import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { router } from "expo-router";

import StepIndicator from "@/src/components/Ingr/StepIndicator";
import useCreateStore from "@/hooks/stores/useCreateStore";
import NavigationButtons from "@/src/components/common/button/NavigationButtons";
import Step2Content from "@/src/components/store/create/Step2Content";
import useCreateStoreStyle from "@/src/styles/store/CreateStoreStyle";

export default function Step2Screen() {
  const { storeForm, updateStoreForm } = useCreateStore();
  const styles = useCreateStoreStyle();

  const stepData = {
    title: "비밀번호 설정",
    description: "새로운 가게 비밀번호 (5자리)를 입력해주세요",
    content: (
      <Step2Content storeForm={storeForm} handleChange={updateStoreForm} />
    ),
    handleNext: () => router.push("/create-store/step3"),
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
