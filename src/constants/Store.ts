import MockStore1 from "@/assets/images/store/mockStore1.png";
import MockStore2 from "@/assets/images/store/mockStore2.png";
import MockStore3 from "@/assets/images/store/mockStore3.webp";
import { Store } from "@/src/types/Store";

const mockStore1: Partial<Store> = {
  id: 2,
  name: "포롱",
  userId: 1,
  thumbnail: MockStore1,
};

const mockStore2 = {
  id: 3,
  name: "오비",
  userId: 1,
  thumbnail: MockStore2,
};

const mockStore3 = {
  id: 4,
  name: "스타벅스",
  userId: 1,
  thumbnail: MockStore3,
};

export const mockStores = [mockStore1, mockStore2, mockStore3];
