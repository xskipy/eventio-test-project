import { apiUrl } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import ErrorResponse from "@/types/api/ErrorResponse";
import devLog from "@/utils/devLog";
import getApiKey from "@/utils/getApiKey";
import { QueryFunctionContext, QueryKey, useQuery as useReactQuery } from "@tanstack/react-query";

const useQuery = <TData = unknown, TError = unknown>(queryKey: QueryKey) => {
  const [endpointUrl] = queryKey;
  const { accessToken, refreshSession, isTokenExpired } = useAuth();

  return useReactQuery<TData, TError>({
    queryKey,
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const APIKey = getApiKey();

      if (await isTokenExpired()) await refreshSession();

      devLog("info", "Quering..", `${apiUrl}${endpointUrl}`);

      const res = await fetch(`${apiUrl}${endpointUrl}` ?? "", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          APIKey,
          ...(accessToken ? { authorization: accessToken } : {}),
        },
        signal,
      });

      if (!res.ok) {
        devLog("debug", "Mutation - Res not ok", { status: res.status });

        const data = (await res.json()) as ErrorResponse;

        if (data?.message) {
          devLog("error", "Mutation error, message:", data.message, "code", data.code);
          throw new Error(data.message, { cause: data?.code ?? res.status });
        }

        throw new Error("Unknown server error", { cause: res.status });
      }

      const data = await res.json();

      return data;
    },
  });
};

export default useQuery;
