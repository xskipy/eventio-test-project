import { apiUrl } from "@/config";
import refreshSession from "@/utils/refreshToken";
import { getFromStorage } from "@/utils/storage";
import { QueryFunctionContext, QueryKey, useQuery as useReactQuery } from "@tanstack/react-query";

const useQuery = <TData = unknown, TError = unknown>(queryKey: QueryKey) => {
  const [endpointUrl] = queryKey;

  return useReactQuery<TData, TError>({
    queryKey,
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const APIKey = process.env.API_KEY;

      if (!APIKey)
        throw new Error(
          "API_KEY is not defined in environment variables. Check docs for more information."
        );

      const accessToken = await getFromStorage("auth");

      const res = await fetch(`${apiUrl}${endpointUrl}` ?? "", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          APIKey,
          // TODO: add access token
          ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        },
        signal,
      });

      if (!res.ok) {
        if (res.status === 401) {
          // TODO: Return user to sign in page
          await refreshSession();
        }
        throw new Error("Unknown server error", { cause: 500 });
      }

      const data = await res.json();

      if (data?.errors) {
        const { message } = data.errors[0];

        throw new Error(message, { cause: res.status });
      }

      return data;
    },
  });
};

export default useQuery;
