import * as SecureStore from "expo-secure-store";

// Syntatic sugar for storage functions

export const saveToStorage = async (key: string, value: string) =>
  SecureStore.setItemAsync(key, value);

export const getFromStorage = async (key: string): Promise<string | null> =>
  SecureStore.getItemAsync(key);
