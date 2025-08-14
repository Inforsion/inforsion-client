import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { Image } from "expo-image";
import LogoText from "../assets/images/inforsion-logo-text.png";
import { useState, useRef } from "react";
import { Store } from "@/src/types/Store";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { mockStores } from "@/src/constants/Store";
import storeStyles from "@/src/styles/StoreStyle";
import AnimatedStoreItem from "@/src/components/store/AnimatedStoreItem";
import AnimatedCreateButton from "@/src/components/store/AnimatedCreateButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 150;
const ITEM_SPACING = 10;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const styles = storeStyles(SCREEN_WIDTH);

const Stores = () => {
  const [ownedStores, setOwnedStores] = useState<Store[]>(mockStores);

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
                <AnimatedStoreItem
                  key={store.id}
                  store={store}
                  index={index}
                  scrollX={scrollX}
                  styles={styles}
                />
              ))}
              <AnimatedCreateButton
                index={ownedStores.length}
                scrollX={scrollX}
                styles={styles}
              />
            </>
          ) : (
            <AnimatedCreateButton index={0} scrollX={scrollX} styles={styles} />
          )}
        </AnimatedScrollView>
        <Image source={LogoText} style={styles.logo} />
      </View>
    </ThemedView>
  );
};

export default Stores;
