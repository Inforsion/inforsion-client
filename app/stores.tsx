import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { Image } from "expo-image";
import LogoText from "../assets/images/inforsion-logo-text.png";
import { Background } from "@react-navigation/elements";
import { useState } from "react";
import { Store } from "@/src/types/Store";
import MockStore1 from "../assets/images/store/mockStore1.png";
import MockStore2 from "../assets/images/store/mockStore2.png";
import MockStore3 from "../assets/images/store/mockStore3.webp";

import CreateStoreButton from "@/src/components/store/CreateStoreButton";

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
    id: 2,
    storeTitle: "스타벅스",
    ownerId: 1,
    thumbnailURL: MockStore3,
  };

  const [ownedStores, setOwnedStores] = useState<Store[]>([
    mockStore1,
    mockStore2,
    mockStore3,
  ]);

  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  // 저장된 가게 정보 불러오기

  return (
    <ThemedView style={styles.container}>
      <Background style={styles.background}>
        <ScrollView
          horizontal={true}
          style={styles.storeList}
          aria-label={"가게 목록"}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {ownedStores.length > 0 ? (
            <>
              {ownedStores.map((store) => (
                <View key={store.id} style={styles.link}>
                  <Image
                    source={store.thumbnailURL}
                    alt={store.storeTitle || "가게 이미지"}
                    style={styles.storeItem}
                  />
                </View>
              ))}
              <CreateStoreButton style={styles.link} />
            </>
          ) : (
            <CreateStoreButton style={styles.link} />
          )}
        </ScrollView>
        <Image source={LogoText} style={styles.logo}></Image>
      </Background>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    width: 150,
    height: 150,
    margin: 15,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    height: "100%",
    backgroundColor: "#3653A4",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 20,
    bottom: 20,
  },
  storeList: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    padding: 30,
  },
  storeItem: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: "100%",
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  },
});

export default Stores;
