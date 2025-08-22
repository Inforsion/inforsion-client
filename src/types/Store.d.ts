export interface Store {
  id: number;
  userId: number;
  name: string;
  description?: string;
  location: string;
  phoneNumber?: string;
  email: string;
  businessRegistrationNumber: string;
  openingHours: string; // JSON 문자열로 저장
  thumbnail: string; // 이미지 URL

  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  thumbnailUrl: string;
  originalFileName: string;
  s3Key: string;
  hasThumbnail: boolean;
}

export type PostStorePayload = Omit<
  Store,
  | "id"
  | "userId"
  | "createdAt"
  | "updatedAt"
  | "thumbnailUrl"
  | "originalFileName"
  | "s3Key"
  | "hasThumbnail"
  | "isActive"
>;
