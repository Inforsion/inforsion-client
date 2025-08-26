import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import StepIndicator from "@/src/components/Ingr/StepIndicator";
import useCreateStore from "@/hooks/stores/useCreateStore";
import NavigationButtons from "@/src/components/common/button/NavigationButtons";
import Step3Content from "@/src/components/store/create/Step3Content";
import { PostStorePayload } from "@/src/types/Store";
import { createStore } from "@/api/store/storeAPI";

export default function Step3Screen() {
  const { storeForm, updateStoreForm } = useCreateStore();

  const handleSubmit = async () => {
    if (!storeForm.name || !storeForm.password) {
      alert("가게 이름과 비밀번호를 입력해주세요.");
      return;
    }

    const postData: PostStorePayload = {
      name: storeForm.name,
      description: "",
      thumbnail: storeForm.thumbnail,
      location: "청당동",
      phoneNumber: "01090504371",
      email: "starbucks@gmail.com",
      businessRegistrationNumber: "1234",
      openingHours: "10",
    };

    const data = await createStore(postData, 1);
    console.log("서버 응답:", data);
    console.log("가게 정보:", storeForm);
  };

  const handleChange = (field: string, value: string) => {
    updateStoreForm(field, value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StepIndicator maxSteps={3} currentStep={2} />

        <View style={styles.header}>
          <Text style={styles.title}>가게 생성</Text>
          <Text style={styles.description}>
            운영할 가게를 추가하여 관리해보세요
          </Text>
        </View>

        <View style={styles.content}>
          <Step3Content storeForm={storeForm} />
        </View>
        <NavigationButtons
          onNext={handleSubmit}
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
