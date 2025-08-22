import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StepIndicator from "@/src/components/Ingr/StepIndicator";
import InputField from "@/src/components/Ingr/InputField";
import React, { useState } from "react";
import CameraImg from "@/assets/images/Ingr/camera.png";
import {
  createStore,
  getAllStores,
  getStoreById,
} from "@/src/api/store/storeAPI";
import { PostStorePayload, Store } from "@/src/types/Store";

const CreateStoreScreen = () => {
  const [storeForm, setStoreForm] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });

  const handleChange = (field: string, value: string) => {
    setStoreForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!storeForm.name || !storeForm.description) {
      alert("가게 이름과 설명을 입력해주세요.");
      return;
    }

    const postData: PostStorePayload = {
      name: storeForm.name,
      description: storeForm.description,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <StepIndicator />

        <View style={styles.card}>
          <View style={styles.photoUpload}>
            <View style={styles.photoIconCircle}>
              <Image source={CameraImg} />
              <Text style={styles.photoText}>사진을 등록해주세요</Text>
            </View>
          </View>

          <InputField
            label="가게 이름"
            placeholder="가게 이름을 입력해주세요."
            value={storeForm.name}
            onChangeText={(e) => handleChange("name", e)}
          />
          <InputField
            label="가게 설명"
            placeholder="가게 설명을 입력해주세요."
            value={storeForm.description}
            onChangeText={(e) => handleChange("description", e)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>저장</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 40,
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
});

export default CreateStoreScreen;
