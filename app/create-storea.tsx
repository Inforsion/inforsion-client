import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import StepIndicator from "@/src/components/Ingr/StepIndicator";
import React, { useState } from "react";
import { createStore } from "@/src/api/store/storeAPI";
import { PostStorePayload } from "@/src/types/Store";
import { Colors } from "@/src/constants/Colors";
import useStep from "@/hooks/useStep";
import Step1Content from "@/src/components/store/create/Step1Content";
import Step2Content from "@/src/components/store/create/Step2Content";
import Step3Content from "@/src/components/store/create/Step3Content";

const CreateStoreScreen = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "light" ? Colors["light"] : Colors["dark"];
  const [storeForm, setStoreForm] = useState({
    name: "",
    location: "",
    thumbnail: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!storeForm.name || !storeForm.location) {
      alert("가게 이름과 위치를 입력해주세요.");
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
    setStoreForm((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "가게 생성",
      description: "운영할 가게를 추가하여 관리해보세요",
      content: (
        <Step1Content storeForm={storeForm} handleChange={handleChange} />
      ),
      validate: () => !!storeForm.name && !!storeForm.location,
    },
    {
      title: "비밀번호 설정",
      description: "새로운 가게 비밀번호 (5자리)를 입력해주세요",
      content: (
        <Step2Content storeForm={storeForm} handleChange={handleChange} />
      ),
      validate: () => storeForm.password.length === 5,
    },
    {
      title: "가게 정보 확인",
      description: "가게 정보를 한 번 더 확인해주세요.",
      content: <Step3Content storeForm={storeForm} />,
    },
  ];

  const { currentStep, goToNextStep } = useStep(steps, handleSubmit);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StepIndicator maxSteps={steps.length} currentStep={currentStep} />

        <View style={styles.storeCreateHeader}>
          <Text style={styles.storeCreateTitle}>
            {steps[currentStep].title || "가게 생성"}
          </Text>
          <Text
            style={[styles.storeCreateDescription, { color: colors.text.weak }]}
          >
            {steps[currentStep].description ||
              "운영할 가게를 추가하여 관리해보세요"}
          </Text>
        </View>

        <View style={styles.storeCreateContent}>
          {steps[currentStep]?.content}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={goToNextStep}>
        <Text style={styles.submitText}>
          {currentStep === steps.length - 1 ? "가게 생성하기" : "다음"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  stepWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#268AFF",
    marginRight: 8,
  },
  stepText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  photoUpload: {
    alignItems: "center",
    marginBottom: 20,
  },
  photoIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  photoText: {
    marginTop: 10,
    color: "#515151",
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "center",
  },
  col: {
    flex: 1,
    flexDirection: "column",
  },
  label: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#2F2F2F",
  },
  inputWrapper: {
    flex: 2,
  },
  input: {
    fontSize: 12,
    paddingVertical: 4,
    color: "#343434",
  },
  unitText: {
    fontSize: 12,
    color: "#A5A5A5",
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: "#2897FF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  listTitle: {
    color: "#272525",
    fontWeight: "bold",
    fontSize: 14,
  },
  editText: {
    color: "#FF7173",
    fontWeight: "bold",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingTop: 28,
    paddingBottom: 16,
    marginBottom: 8,
  },
  th: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  rowList: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  td: {
    flex: 1,
    textAlign: "center",
    color: "#272525",
    fontSize: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  stockCell: {
    flex: 1,
    alignItems: "center",
  },
  subText: {
    fontSize: 10,
    color: "#888",
  },
  fieldContainer: { gap: 8, marginTop: 8, marginBottom: 16 },
  storeField: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  storeFieldLabel: {
    fontWeight: "600",
  },
  storeCreateHeader: {
    marginBottom: 20,
  },
  storeCreateTitle: { fontWeight: "700", marginBottom: 4, fontSize: 20 },
  storeCreateDescription: {
    fontWeight: "400",
    fontSize: 12,
  },
  storeCreateContent: {
    flex: 1,
  },
});

export default CreateStoreScreen;
