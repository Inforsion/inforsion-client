import { Get } from "@/api/axios";

export const getAllStores = async () => {
  try {
    const response = await Get("/api/stores");
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
