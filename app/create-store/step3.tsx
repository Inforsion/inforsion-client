import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import StepIndicator from "@/src/components/Ingr/StepIndicator";
import useCreateStore from "@/hooks/stores/useCreateStore";
import NavigationButtons from "@/src/components/common/button/NavigationButtons";
import Step3Content from "@/src/components/store/create/Step3Content";
import { PostStorePayload } from "@/src/types/Store";
import { createStore } from "@/api/store/storeAPI";
import useCreateStoreStyle from "@/src/styles/store/CreateStoreStyle";
import { StepData } from "@/src/types/Common";

export default function Step3Screen() {
  const { storeForm, updateStoreForm } = useCreateStore();
  const styles = useCreateStoreStyle();

  const handleSubmit = async () => {
    if (!storeForm.name || !storeForm.password) {
      alert("가게 이름과 비밀번호를 입력해주세요.");
      return;
    }

    const postData: PostStorePayload = {
      name: storeForm.name,
      description: "",
      thumbnail: storeForm.thumbnail,
      location: "임의의 주소",
    };

    const data = await createStore(postData);
    if (data) {
      router.navigate("/stores");
    } else {
      Alert.alert("가게 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const stepData: StepData = {
    title: "가게 정보 확인",
    description: "가게 정보를 한 번 더 확인해주세요.",
    content: <Step3Content storeForm={storeForm} />,
    handleNext: () => handleSubmit(),
    validation: () => true,
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
          onNext={stepData.handleNext}
          canGoNext={stepData.validation()}
          nextLabel={"다음"}
        />
      </View>
    </SafeAreaView>
  );
}
