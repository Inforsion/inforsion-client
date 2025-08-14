import { StyleProp, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import CreateStoreIcon from "@/assets/images/store/createStoreIcon.png";

interface CreateStoreButtonProps {
  style: StyleProp<ViewStyle>;
}

const CreateStoreButton = ({ style }: CreateStoreButtonProps) => {
  return (
    <View style={style}>
      <Image
        style={{ width: 72, height: 72, borderRadius: 100, margin: 5 }}
        source={CreateStoreIcon}
      />
    </View>
  );
};

export default CreateStoreButton;
