import { apiUrl, tokenCheckDelta } from "@/config";
import IAuthContext from "@/types/AuthContext";
import UserData from "@/types/UserData";
import devLog from "@/utils/devLog";
import getApiKey from "@/utils/getApiKey";
import setStateAndStorage from "@/utils/saveStateAndStorage";
import { clearFromStorage, getFromStorage } from "@/utils/storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext, FC, PropsWithChildren } from "react";

const AuthContext = createContext({} as IAuthContext);

const clearStorageUserData = () => {
  clearFromStorage("accessToken");
  clearFromStorage("refreshToken");
  clearFromStorage("userData");
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Properly logout user and return to login
  const logoutUser = () => {
    devLog("info", "Logging out");
    clearStorageUserData();
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);
    router.replace("/login");
  };

  /**
   *
   * @param freshToken (optional) New or different token that should be checked
   * Uses accessToken in context by default
   * @returns true if Token expired or will expire soon (tokenCheckDelta)
   */
  const isTokenExpired = async (freshToken?: string): Promise<boolean> => {
    const token = freshToken ?? accessToken;
    devLog("debug", "Checking if token expired");

    // No token set, treat it as expired
    if (!token) {
      devLog("debug", "Token expired");
      return true;
    }

    // Token invalid or expired
    const tokenExp = jwtDecode(token)?.exp;

    if (!tokenExp || tokenExp - tokenCheckDelta <= new Date().getTime() / 1000) {
      devLog("debug", "Token expired");
      return true;
    }

    devLog("debug", "Token not expired");
    return false;
  };

  const onSetRefreshToken = (newToken: string) => {
    setStateAndStorage("refreshToken", setRefreshToken, newToken);
  };

  const onSetAccessToken = (newToken: string) => {
    setStateAndStorage("accessToken", setAccessToken, newToken);
  };

  const onSetUserData = (newData: UserData) => {
    setStateAndStorage<UserData>("userData", setUserData, newData);
  };

  /**
   *
   * Refreshes access token
   * @param freshRefreshToken (optional) New or different refresh token that would be used
   * Uses accessToken in context by default
   *
   */
  const refreshSession = async (freshRefreshToken?: string) => {
    devLog("debug", "Refreshing session");
    const refToken = freshRefreshToken ?? refreshToken;

    if (!isUserLoggedIn() && !freshRefreshToken) {
      devLog("info", "User not logged in. Exiting refreshSession");
      return;
    }
    const APIKey = getApiKey();

    if (!refToken) {
      devLog("info", "Refresh token not present. Exiting refreshSession. Logging out user.");
      logoutUser();
      return;
    }

    try {
      devLog("info", "Decoding JWT Token.");

      // Refresh token invalid or expired
      const refreshExp = jwtDecode(refToken)?.exp;

      if (!refreshExp || refreshExp <= new Date().getTime() / 1000) {
        devLog("info", "Refresh token expired.");
        logoutUser();
        return;
      }
    } catch (error) {
      console.error("Something went wrong decoding token", error);
      router.replace("/error");
    }

    devLog("info", "Fetching new token.");
    try {
      const res = await fetch(`${apiUrl}auth/refresh-token` ?? "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey,
        },
        body: JSON.stringify({
          refreshToken: refToken,
        }),
      });

      if (res.ok) {
        // Save new Token
        const auth = res.headers.get("authorization");
        if (auth) onSetAccessToken(auth);

        const data = await res.json();
        devLog("debug", "Token Refreshed!.");

        // Refresh user data;
        onSetUserData(data);
        return;
      }

      // TODO: Revisit more complex error handling
      devLog("debug", "Response not OK, logging out user.");
      logoutUser();
    } catch (error) {
      console.error("Something went wrong refreshing token", error);
      router.replace("/error");
    }
  };

  useEffect(() => {
    const loadDataStorage = async () => {
      setAuthLoading(true);
      devLog("info", "Getting data from storage");

      const storageAccToken = await getFromStorage("accessToken");
      if (storageAccToken) setAccessToken(storageAccToken);

      const storageRefToken = await getFromStorage("refreshToken");
      if (storageRefToken) setRefreshToken(storageRefToken);

      const storageUsData = await getFromStorage("userData");

      try {
        if (storageUsData) setUserData(JSON.parse(storageUsData));
      } catch (error) {
        devLog("error", "Error parsing access token from storage", error);

        // TODO: Revisit - Maybe better to logoutUser() and return to login
        router.replace("error");
        setAuthLoading(false);
        return;
      }

      // If token expired (or will expire soon) refresh session
      if (storageAccToken && storageRefToken && (await isTokenExpired(storageAccToken)))
        await refreshSession(storageRefToken);

      devLog("info", "Loading from data storage completed.");

      setAuthLoading(false);
    };

    loadDataStorage();
  }, []);

  const isUserLoggedIn = () => Boolean(userData && accessToken && refreshToken);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setRefreshToken: onSetRefreshToken,
        authLoading,
        setAccessToken: onSetAccessToken,
        isUserLoggedIn,
        userData,
        setUserData: onSetUserData,
        refreshSession,
        isTokenExpired,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
