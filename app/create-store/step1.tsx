import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { router } from "expo-router";

import StepIndicator from "@/src/components/Ingr/StepIndicator";
import Step1Content from "@/src/components/store/create/Step1Content";
import useCreateStore from "@/hooks/stores/useCreateStore";
import NavigationButtons from "@/src/components/common/button/NavigationButtons";
import useCreateStoreStyle from "@/src/styles/store/CreateStoreStyle";

export default function Step1Screen() {
  const { storeForm, updateStoreForm } = useCreateStore();
  const styles = useCreateStoreStyle();
  const stepData = {
    title: "가게 생성",
    description: "운영할 가게를 추가하여 관리해보세요",
    content: (
      <Step1Content storeForm={storeForm} handleChange={updateStoreForm} />
    ),
    handleNext: () => router.push("/create-store/step2"),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StepIndicator maxSteps={3} currentStep={0} />
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
