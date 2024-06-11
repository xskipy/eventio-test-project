import { apiUrl, tokenCheckDelta } from "@/config";
import useRefreshSession from "@/hooks/useRefreshSession";
import IAuthContext from "@/types/AuthContext";
import UserData from "@/types/UserData";
import devLog from "@/utils/devLog";
import getApiKey from "@/utils/getApiKey";
import setStateAndStorage from "@/utils/saveStateAndStorage";
import { clearFromStorage, getFromStorage, saveToStorage } from "@/utils/storage";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useMemo,
} from "react";

const AuthContext = createContext({} as IAuthContext);

const clearStorageUserData = () => {
  clearFromStorage("accessToken");
  clearFromStorage("refreshToken");
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Properly logout user and return to login
  const logoutUser = () => {
    devLog("info", "Logging out");
    clearStorageUserData();
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);
    router.replace("/");
  };

  const isTokenExpired = async (freshToken?: string): Promise<boolean> => {
    const token = freshToken ?? accessToken;
    devLog("debug", "Checking token expired", { token });

    // No token set, treat it as expired
    if (!token) {
      devLog("debug", "Token expired");
      return true;
    }

    // Token invalid or expired
    const refreshExp = jwtDecode(token)?.exp;
    if (!refreshExp || refreshExp <= new Date().getTime() + tokenCheckDelta) {
      devLog("debug", "Token expired");
      return true;
    }

    devLog("debug", "Token not expired");
    return false;
  };

  const refreshSession = async () => {
    devLog("debug", "Refreshing session");

    if (!isUserLoggedIn) {
      devLog("info", "User not logged in. Exiting refreshSession");
      return;
    }
    const APIKey = getApiKey();

    if (!refreshToken) {
      devLog("info", "Refresh token not present. Exiting refreshSession. Logging out user.");
      logoutUser();
      return;
    }

    try {
      // Refresh token invalid or expired
      const refreshExp = jwtDecode(refreshToken)?.exp;
      if (!refreshExp || refreshExp <= new Date().getTime()) {
        logoutUser();
        return;
      }
    } catch (error) {
      console.error("Something went wrong decoding token", error);
      router.replace("/error");
    }

    try {
      const res = await fetch(`${apiUrl}auth/refresh-token` ?? "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey,
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (res.ok) {
        // console.log("headers", {
        //   // headers: res.headers,
        //   auth: res.headers.get("authorization"),
        //   refreshToken: res.headers.get("refresh-token"),
        // });

        // Save new Token
        const auth = res.headers.get("authorization");
        if (auth) setAccessToken(auth);

        const data = await res.json();

        // Refresh user data;
        setUserData(data);
        return;
      }

      devLog("debug", "Response not OK, logging out user.");
      logoutUser();
    } catch (error) {
      console.error("Something went wrong refreshing token", error);
      // router.replace("/error");
    }
  };

  useEffect(() => {
    const loadDataStorage = async () => {
      setAuthLoading(true);

      const storageAccToken = await getFromStorage("accessToken");
      if (storageAccToken) setAccessToken(storageAccToken);

      const storageRefToken = await getFromStorage("refreshToken");
      if (storageRefToken) setAccessToken(storageRefToken);

      const storageUsData = await getFromStorage("userData");

      try {
        if (storageUsData) setUserData(JSON.parse(storageUsData));
      } catch (error) {
        console.error("Error parsing access token from storage");

        // TODO: Probably better to clear storage and return to login
        router.replace("error");
        setAuthLoading(false);
        return;
      }

      if (storageAccToken && (await isTokenExpired(storageAccToken))) await refreshSession();

      setAuthLoading(false);
    };

    loadDataStorage();
  }, []);

  const onSetRefreshToken = (newToken: string) => {
    setStateAndStorage("refreshToken", setRefreshToken, newToken);
  };

  const onSetAccessToken = (newToken: string) => {
    setStateAndStorage("accessToken", setAccessToken, newToken);
  };

  const onSetUserData = (newData: UserData) => {
    setStateAndStorage<UserData>("userData", setUserData, newData);
  };

  const isUserLoggedIn = useMemo(
    () => Boolean(userData && accessToken && refreshToken),
    [userData, accessToken, refreshToken]
  );

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
