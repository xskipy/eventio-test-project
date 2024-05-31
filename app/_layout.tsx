import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const RootLayout = () => {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      // TODO: set route based on user logged in
      initialRouteName="index"
    >
      <Stack.Screen options={{ title: "Login" }} name="index" />
      <Stack.Screen options={{ title: "Sign Up" }} name="signup" />
      {/* <Stack.Screen options={{ title: 'Main' }} name="(main)" /> */}
    </Stack>
  );
};

export default RootLayout;
