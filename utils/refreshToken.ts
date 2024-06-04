import { apiUrl } from "@/config";
import { getFromStorage, saveToStorage } from "@/utils/storage";

const refreshSession = async () => {
  const APIKey = process.env.API_KEY;

  if (!APIKey)
    throw new Error(
      "API_KEY is not defined in environment variables. Check docs for more information."
    );

  const refreshToken = await getFromStorage("refreshToken");

  if (!refreshToken) return;

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

    if (!res.ok) {
      return;
    }

    console.log("headers", {
      // headers: res.headers,
      auth: res.headers.get("authorization"),
      refreshToken: res.headers.get("refresh-token"),
    });

    // Save new Token
    const auth = res.headers.get("authorization");
    if (auth) saveToStorage("auth", auth);

    const data = await res.json();

    // Refresh user data;
    saveToStorage("userData", JSON.stringify(data));
  } catch (error) {
    // TODO: Throw something went wrong screen
    console.error("Something went wrong refreshing token", error);
  }
};

export default refreshSession;
