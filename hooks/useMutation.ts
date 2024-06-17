import { apiUrl } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import ErrorResponse from "@/types/api/ErrorResponse";
import devLog from "@/utils/devLog";
import getApiKey from "@/utils/getApiKey";
import {
  MutationKey,
  UseMutationOptions,
  useMutation as useReactMutation,
} from "@tanstack/react-query";

export type FetchMethodType = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

const useMutation = <TData, TError, TVariables>(
  mutationKey: MutationKey,
  fetchMethod: FetchMethodType = "POST",
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  const [endpointUrl] = mutationKey;
  const { setAccessToken, setRefreshToken, accessToken, refreshSession, isTokenExpired } =
    useAuth();

  return useReactMutation<TData, TError, TVariables>({
    mutationKey,
    mutationFn: async (variables) => {
      devLog("debug", "Executing mutation", `${apiUrl}${endpointUrl}`);
      const APIKey = getApiKey();

      if (await isTokenExpired()) await refreshSession();

      const res = await fetch(`${apiUrl}${endpointUrl}` ?? "", {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
          APIKey,
          ...(accessToken ? { authorization: accessToken } : {}),
        },
        ...(variables ? { body: JSON.stringify(variables) } : {}),
      });

      if (!res.ok) {
        devLog("debug", "Mutation - Res not ok", { status: res.status });

        const data = (await res.json()) as ErrorResponse;

        if (data?.message) {
          devLog("error", "Mutation error, message:", data.message, "code", data.code);
          throw new Error(data.message, { cause: data?.code ?? res.status });
        }

        devLog("debug", "Response data: ", { data });
        throw new Error("Unknown server error", { cause: res.status });
      }

      // Handle Recieved Auth headers if present
      const auth = res.headers.get("authorization");
      if (auth) setAccessToken(auth);

      const refreshToken = res.headers.get("refresh-token");
      if (refreshToken) setRefreshToken(refreshToken);

      const data = await res.json();

      return data;
    },
    ...options,
  });
};

export default useMutation;
