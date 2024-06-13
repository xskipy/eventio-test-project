import { Platform } from "react-native";

export const Device = {
  isAndroid: Platform.OS === "android",
  isIos: Platform.OS === "ios",
};
