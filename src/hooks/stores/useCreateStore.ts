import useCreateStoreStore from "@/src/stores/store/useCreateStoreStore";

const useCreateStore = () => {
  const { storeForm, resetStoreForm, setStoreForm } = useCreateStoreStore();

  const updateStoreForm = (field: string, value: string) => {
    setStoreForm(field, value);
  };

  return {
    updateStoreForm,
    storeForm,
    resetStoreForm,
  };
};

export default useCreateStore;
