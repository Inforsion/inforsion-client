// 애니메이션 아이템 컴포넌트
import { Store } from "@/src/types/Store";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";

const ITEM_WIDTH = 150;
const ITEM_SPACING = 10;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;

interface AnimatedStoreItemProps {
  store: Store;
  index: number;
  scrollX: Animated.SharedValue<number>;
  styles: {
    storeWrapper: any;
    storeItem: any;
    storeImage: any;
  };
  onClickStore: () => void;
}

const AnimatedStoreItem = ({
  store,
  index,
  scrollX,
  styles,
  onClickStore,
}: AnimatedStoreItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * TOTAL_ITEM_WIDTH,
      index * TOTAL_ITEM_WIDTH,
      (index + 1) * TOTAL_ITEM_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5], // 멀리 있을 때 0.5, 가운데 있을 때 1
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6], // 투명도도 함께 조절
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.storeWrapper}>
      <Pressable onPress={onClickStore}>
        <Animated.View style={[styles.storeItem, animatedStyle]}>
          <Image
            source={store.thumbnail}
            alt={store.name || "가게 이미지"}
            style={styles.storeImage}
            contentFit="cover"
          />
        </Animated.View>
      </Pressable>
      <Text
        style={{
          fontFamily: "Pretendard",
          color: "#fff",
          opacity: 0.8,
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          width: 100,
          height: 20,
          marginTop: 10,
        }}
      >
        {store.name}
      </Text>
    </View>
  );
};

export default AnimatedStoreItem;
