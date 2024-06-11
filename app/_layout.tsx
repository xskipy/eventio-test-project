import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { breakpoints, colors } from "@/constants/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryRetryCount } from "@/config";
import { AuthProvider } from "@/contexts/AuthContext";

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "error",
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: queryRetryCount,
    },
    mutations: {
      retry: queryRetryCount,
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          initialRouteName="/index"
          screenOptions={{
            contentStyle: {
              padding: breakpoints.padding,
              backgroundColor: colors.white,
            },
            headerShown: false,
          }}
          // TODO: set route based on user logged in
        >
          <Stack.Screen options={{ title: "Login" }} name="index" />
          <Stack.Screen options={{ title: "Sign Up" }} name="signup" />
          <Stack.Screen options={{ title: "Something went wrong" }} name="error" />
          <Stack.Screen
            options={{
              title: "Main",
              contentStyle: {
                backgroundColor: colors.background.primary,
              },
            }}
            name="(main)"
          />
        </Stack>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default RootLayout;
