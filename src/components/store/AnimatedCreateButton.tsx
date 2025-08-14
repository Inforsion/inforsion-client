// 애니메이션 생성 버튼 컴포넌트
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View } from "react-native";
import CreateStoreButton from "@/src/components/store/CreateStoreButton";

const ITEM_WIDTH = 150;
const ITEM_SPACING = 10;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;

interface AnimatedCreateButtonProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
  styles: {
    storeWrapper: any;
    storeItem: any;
    storeImage: any;
  };
}

const AnimatedCreateButton = ({
  index,
  scrollX,
  styles,
}: AnimatedCreateButtonProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * TOTAL_ITEM_WIDTH,
      index * TOTAL_ITEM_WIDTH,
      (index + 1) * TOTAL_ITEM_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.storeWrapper}>
      <Animated.View style={[styles.storeItem, animatedStyle]}>
        <CreateStoreButton style={styles.storeImage} />
      </Animated.View>
    </View>
  );
};

export default AnimatedCreateButton;
