import Layout from "@/components/screens/Layout";
import { useAuth } from "@/contexts/AuthContext";
import devLog from "@/utils/devLog";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";

/**
 *
 * SplashScreen is used for directing user to the correct screen
 * depending on if is user logged in
 *
 * Expo doesn't support this natively
 *
 */
const SplashScreen = () => {
  const { authLoading, isUserLoggedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const navigatorReady = rootNavigationState?.key != null;
    devLog("debug", "Splash Screen ", { navigatorReady, authLoading, isUserLoggedIn });

    if (authLoading || !navigatorReady) return;

    if (!isUserLoggedIn()) {
      devLog("info", "User not logged in. Navigating to /login");
      router.replace("/login");
      return;
    }

    devLog("info", "User logged in. Navigating to /main");
    router.replace("(main)");
  }, [authLoading, rootNavigationState, isUserLoggedIn]);

  return (
    <Layout type="centered">
      <Image
        style={{
          width: 96,
          height: 96,
        }}
        source={require("../assets/images/white-logo.png")}
      />
    </Layout>
  );
};

export default SplashScreen;
