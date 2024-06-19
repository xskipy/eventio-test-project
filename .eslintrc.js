// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: [
    "node_modules/",
    ".buckconfig",
    ".flowconfig",
    "metro.config.js",
    ".expo/",
    ".expo-shared/",
    "ios/",
    "android/",
    "*.log",
    "*.tsbuildinfo",
    "*.lock",
    "*.cache",
    "coverage/",
  ],
};
