import devLog from "@/utils/devLog";

const getApiKey = (): string => {
  const APIKey = process.env.EXPO_PUBLIC_API_KEY;

  if (!APIKey)
    throw new Error(
      "API_KEY is not defined in environment variables. Check docs for more information."
    );

  devLog("debug", "Getting API KEY");
  return APIKey;
};

export default getApiKey;
