import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import StepIndicator from "@/src/components/Ingr/StepIndicator";
import Step1Content from "@/src/components/store/create/Step1Content";
import useCreateStore from "@/hooks/stores/useCreateStore";
import NavigationButtons from "@/src/components/common/button/NavigationButtons";

export default function Step1Screen() {
  const { storeForm, updateStoreForm } = useCreateStore();

  const handleNext = () => {
    router.push("/create-store/step2");
  };

  const handleChange = (field: string, value: string) => {
    updateStoreForm(field, value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StepIndicator maxSteps={3} currentStep={0} />

        <View style={styles.header}>
          <Text style={styles.title}>가게 생성</Text>
          <Text style={styles.description}>
            운영할 가게를 추가하여 관리해보세요
          </Text>
        </View>

        <View style={styles.content}>
          <Step1Content storeForm={storeForm} handleChange={handleChange} />
        </View>
        <NavigationButtons
          onNext={handleNext}
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
