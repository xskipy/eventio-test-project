import { clearFromStorage, saveToStorage } from "@/utils/storage";

const setStateAndStorage = <T = string>(
  storageKey: string,
  dispatchFn: React.Dispatch<React.SetStateAction<T | null>>,
  data: T | null
) => {
  dispatchFn(data);

  if (!data) {
    clearFromStorage(storageKey);
    return;
  }

  if (typeof data === "object") {
    saveToStorage(storageKey, JSON.stringify(data));
    return;
  }

  saveToStorage(storageKey, data as string);
};

export default setStateAndStorage;
