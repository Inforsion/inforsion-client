import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Image } from "expo-image";
import ProfileSVG from "@/assets/icons/Profile.svg";

const InforsionHeader = () => {
  const INFORSION_HEADER_TEXT = "Inforsion";
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {/* 탭 아이콘*/}
        <Foundation name="list" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{INFORSION_HEADER_TEXT}</Text>
      <TouchableOpacity>
        <Image
          source={ProfileSVG}
          style={{ width: 32, height: 32 }}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 64,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343C6A",
  },
});

export default InforsionHeader;
