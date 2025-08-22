export interface Store {
  id: number;
  userId: number;
  name: string;
  location?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  businessRegistrationNumber?: string;
  openingHours?: string; // JSON 문자열로 저장
  thumbnail?: string; // 이미지 URL
}

export type PostStorePayload = Omit<Store, "id" | "userId">;
