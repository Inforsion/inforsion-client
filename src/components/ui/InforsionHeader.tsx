import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import ProfileSVG from "@/assets/icons/profile.svg";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const InforsionHeader = () => {
  const INFORSION_HEADER_TEXT = "Inforsion";
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Octicons name="three-bars" size={24} color="black" />
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
    </SafeAreaView>
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
