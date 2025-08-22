import { ScrollView, View, Dimensions } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { Image } from "expo-image";
import LogoText from "../assets/images/inforsion-logo-text.png";
import { useState, useRef, useEffect } from "react";
import { Store } from "@/src/types/Store";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { mockStores } from "@/src/constants/Store";
import storeStyles from "@/src/styles/StoreStyle";
import AnimatedStoreItem from "@/src/components/store/AnimatedStoreItem";
import AnimatedCreateButton from "@/src/components/store/AnimatedCreateButton";
import { useRouter } from "expo-router";
import { getAllStores } from "@/api/store/storeAPI";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 150;
const ITEM_SPACING = 10;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const styles = storeStyles(SCREEN_WIDTH);

const Stores = () => {
  const [ownedStores, setOwnedStores] = useState<Store[]>(
    mockStores as Store[],
  );
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

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

  const onClick = () => {
    console.log("Store clicked");
    router.navigate("/dashboard");
  };
  const onCreateStore = () => {
    console.log("Create Store clicked");
    router.navigate("/create-store");
  };

  const getStores = async () => {
    setLoading(true);
    try {
      const data = await getAllStores(1);
      if (data) {
        setOwnedStores((prev) => [...data, ...prev]);
      }
    } catch (e) {
      console.error("유저의 가게를 불러오는데 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

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
                  onClickStore={onClick}
                />
              ))}
              <AnimatedCreateButton
                index={ownedStores.length}
                scrollX={scrollX}
                styles={styles}
                onPress={onCreateStore}
              />
            </>
          ) : (
            <AnimatedCreateButton
              index={0}
              scrollX={scrollX}
              styles={styles}
              onPress={onCreateStore}
            />
          )}
        </AnimatedScrollView>
        <Image source={LogoText} style={styles.logo} />
      </View>
    </ThemedView>
  );
};

export default Stores;
