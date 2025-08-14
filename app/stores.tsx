import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { Image } from "expo-image";
import LogoText from "../assets/images/inforsion-logo-text.png";
import { useState, useRef } from "react";
import { Store } from "@/src/types/Store";
import MockStore1 from "../assets/images/store/mockStore1.png";
import MockStore2 from "../assets/images/store/mockStore2.png";
import MockStore3 from "../assets/images/store/mockStore3.webp";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import CreateStoreButton from "@/src/components/store/CreateStoreButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 150;
const ITEM_SPACING = 10;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Stores = () => {
  const mockStore1 = {
    id: 1,
    storeTitle: "포롱",
    ownerId: 1,
    thumbnailURL: MockStore1,
  };

  const mockStore2 = {
    id: 2,
    storeTitle: "오비",
    ownerId: 1,
    thumbnailURL: MockStore2,
  };

  const mockStore3 = {
    id: 3,
    storeTitle: "스타벅스",
    ownerId: 1,
    thumbnailURL: MockStore3,
  };

  const [ownedStores, setOwnedStores] = useState<Store[]>([
    mockStore1,
    mockStore2,
    mockStore3,
  ]);

  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // 스크롤 핸들러
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // 스냅 기능
  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / TOTAL_ITEM_WIDTH);
    const snapOffset = index * TOTAL_ITEM_WIDTH;

    scrollViewRef.current?.scrollTo({
      x: snapOffset,
      animated: true,
    });
  };

  // 애니메이션 아이템 컴포넌트
  const AnimatedStoreItem = ({
    store,
    index,
  }: {
    store: Store;
    index: number;
  }) => {
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
        <Animated.View style={[styles.storeItem, animatedStyle]}>
          <Image
            source={store.thumbnailURL}
            alt={store.storeTitle || "가게 이미지"}
            style={styles.storeImage}
            contentFit="cover"
          />
        </Animated.View>
        <Text
          style={{
            opacity: animatedStyle.opacity,
            color: "#fff",
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
            width: 100,
            height: 20,
            marginTop: 10,
          }}
        >
          {store.storeTitle}
        </Text>
      </View>
    );
  };

  // 애니메이션 생성 버튼 컴포넌트
  const AnimatedCreateButton = ({ index }: { index: number }) => {
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

  return (
    <ThemedView style={styles.container}>
      <View style={styles.background}>
        <AnimatedScrollView
          ref={scrollViewRef}
          horizontal={true}
          style={styles.storeList}
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          decelerationRate="fast"
          snapToInterval={TOTAL_ITEM_WIDTH}
          snapToAlignment="center"
        >
          {ownedStores.length > 0 ? (
            <>
              {ownedStores.map((store, index) => (
                <AnimatedStoreItem key={store.id} store={store} index={index} />
              ))}
              <AnimatedCreateButton index={ownedStores.length} />
            </>
          ) : (
            <AnimatedCreateButton index={0} />
          )}
        </AnimatedScrollView>
        <Image source={LogoText} style={styles.logo} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#3653A4",
    justifyContent: "center",
    alignItems: "center",
  },
  storeList: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2, // 첫 번째와 마지막 아이템이 중앙에 오도록
    paddingVertical: 30,
  },
  storeWrapper: {
    width: TOTAL_ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  storeItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    // backgroundColor: "#fff",
    borderRadius: ITEM_WIDTH / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  storeImage: {
    justifyContent: "center",
    alignItems: "center",
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH / 2,
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 20,
    bottom: 40,
  },
});

export default Stores;
