import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { breakpoints, colors } from "@/constants/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
    mutations: {
      retry: 2,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          contentStyle: {
            padding: breakpoints.padding,
            backgroundColor: colors.white,
          },
          headerShown: false,
        }}
        // TODO: set route based on user logged in
        initialRouteName="index"
      >
        <Stack.Screen options={{ title: "Login" }} name="index" />
        <Stack.Screen options={{ title: "Sign Up" }} name="signup" />
        {/* <Stack.Screen options={{ title: 'Main' }} name="(main)" /> */}
      </Stack>
    </QueryClientProvider>
  );
};

export default RootLayout;
