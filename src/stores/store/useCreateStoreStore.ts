import { create } from "zustand/react";

interface CreateStoreState {
  storeForm: {
    name: string;
    thumbnail: string;
    password: string;
  };
  setStoreForm: (field: string, value: string) => void;
  resetStoreForm: () => void;
  // step
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const useCreateStoreStore = create<CreateStoreState>((set) => {
  return {
    storeForm: {
      name: "",
      thumbnail: "",
      password: "",
    },
    setStoreForm: (field: string, value: string) =>
      set((state) => ({
        storeForm: { ...state.storeForm, [field]: value },
      })),
    resetStoreForm: () =>
      set(() => ({
        storeForm: {
          name: "",
          thumbnail: "",
          password: "",
        },
      })),
    currentStep: 0,
    setCurrentStep: (step: number) => set(() => ({ currentStep: step })),
  };
});

export default useCreateStoreStore;
