import devLog from "@/utils/devLog";

/**
 * Gets API key from .env
 * @returns API key from .env configuration
 * @throws Error if EXPO_PUBLIC_API_KEY not defined in .env variables
 */
const getApiKey = (): string => {
  const APIKey = process.env.EXPO_PUBLIC_API_KEY;

  if (!APIKey)
    throw new Error(
      " EXPO_PUBLIC_API_KEY is not defined in environment variables. Check docs for more information."
    );

  devLog("debug", "Getting API KEY");
  return APIKey;
};

export default getApiKey;
