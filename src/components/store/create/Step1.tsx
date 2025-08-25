import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import CameraImg from "@/assets/images/Ingr/camera.png";
import React from "react";

interface Step1Props {
  storeForm: {
    name: string;
    location: string;
    thumbnail: string;
    password: string;
  };
  handleChange: (field: string, value: string) => void;
}

const Step1 = ({ storeForm, handleChange }: Step1Props) => {
  return (
    <>
      <View style={[styles.fieldContainer]}>
        <Text style={styles.storeFieldLabel}>대표 이미지</Text>
        <View style={styles.photoIconCircle}>
          <Image source={CameraImg} />
          <Text style={styles.photoText}>사진을 등록해주세요</Text>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.storeFieldLabel}>가게 이름</Text>
        <TextInput
          style={styles.storeField}
          placeholder={"가게 이름을 입력해주세요."}
          placeholderTextColor="#A0A0A0"
          value={storeForm.name}
          onChangeText={(str) => handleChange("name", str)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.storeFieldLabel}>가게 주소</Text>
        <TextInput
          style={styles.storeField}
          placeholder={"가게 주소를 입력해주세요."}
          placeholderTextColor="#A0A0A0"
          value={storeForm.location}
          onChangeText={(str) => handleChange("location", str)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default Step1;
