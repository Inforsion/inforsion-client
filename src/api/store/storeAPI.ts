import { Get, Post } from "@/src/api/axios";
import { PostStorePayload, Store } from "@/src/types/Store";

export const getAllStores = async (userId: number) => {
  try {
    const response = await Get<Store[]>(`/api/v1/stores/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("전체 가게 불러오기 실패", error);
    throw error;
  }
};

export const getStoreById = async (storeId: number) => {
  try {
    const response = await Get(`/api/v1/stores/${storeId}`);
    return response.data;
  } catch (error) {
    console.error(`가게 ID ${storeId} 불러오기 실패`, error);
    throw error;
  }
};

interface CreateStoreResponse {
  id: number;
  name: string;
  location: string;
  description: string;
  phoneNumber: string;
  email: string;
  businessRegistrationNumber: string;
  openingHours: string;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userId: number;
  thumbnailUrl: string;
  originalFileName: string;
  s3Key: string;
  hasThumbnail: boolean;
}

export const createStore = async (data: PostStorePayload, userId: number) => {
  try {
    const response = await Post<CreateStoreResponse, PostStorePayload>(
      `/api/v1/stores/${userId}`,
      data,
    );
    return response.data;
  } catch (e) {
    console.error("가게 생성 실패", e);
    throw e;
  }
};
