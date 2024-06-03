import * as SecureStore from "expo-secure-store";

export const saveToStorage = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getFromStorage = async (key: string) => {
  await SecureStore.getItemAsync(key);
};
