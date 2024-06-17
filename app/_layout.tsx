import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { breakpoints, colors, headerTitleStyle } from "@/constants/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryRetryCount } from "@/config";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import devLog from "@/utils/devLog";
import HeaderCloseButton from "@/components/headers/HeaderCloseButton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
      devLog("info", "fonts loaded");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            contentStyle: {
              padding: breakpoints.padding,
              backgroundColor: colors.white,
            },
            headerShown: false,
          }}
        >
          <Stack.Screen
            options={{
              title: "Splash",
              contentStyle: {
                padding: 0,
                backgroundColor: colors.black,
              },
            }}
            name="index"
          />
          <Stack.Screen options={{ title: "Login" }} name="login" />
          <Stack.Screen options={{ title: "Sign Up" }} name="signup" />
          <Stack.Screen
            options={{
              title: "Create new event",
              presentation: "modal",
              headerShown: true,
              contentStyle: {
                backgroundColor: colors.background.secondary,
                paddingTop: breakpoints.padding,
              },
              headerTitleStyle: headerTitleStyle,
              headerTransparent: true,
              headerRight: HeaderCloseButton,
            }}
            name="add-event"
          />
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
