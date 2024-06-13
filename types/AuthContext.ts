import UserData from "@/types/UserData";

interface AuthContext {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  authLoading: boolean;
  isUserLoggedIn: () => boolean;
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  refreshSession: () => Promise<void>;
  isTokenExpired: () => Promise<boolean>;
  logoutUser: () => void;
}

export default AuthContext;
