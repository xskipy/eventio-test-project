import { clearFromStorage, saveToStorage } from "@/utils/storage";

/**
 * Takes data and sets them into storage and state
 * @param storageKey Key for storage
 * @param dispatchFn React setState function
 * @param data Data to be set into storage and state
 * @returns
 */
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
