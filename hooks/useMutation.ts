import { apiUrl } from "@/config";
import { saveToStorage } from "@/utils/storage";
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

  return useReactMutation<TData, TError, TVariables>({
    mutationKey,
    mutationFn: async (variables) => {
      const APIKey = process.env.API_KEY;

      console.log("MUTATING!", { APIKey });

      if (!APIKey)
        throw new Error(
          "API_KEY is not defined in environment variables. Check docs for more information."
        );

      const res = await fetch(`${apiUrl}${endpointUrl}` ?? "", {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
          APIKey,
          // TODO: add access token
          //   ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        },
        ...(variables ? { body: JSON.stringify(variables) } : {}),
      });

      console.log("RES", { res });

      if (!res.ok) {
        console.log("res not ok");
        if (res.status === 401) {
          // TODO: Add refresh token / return user to sign in page
        }
        throw new Error("Unknown server error", { cause: res.status });
      }

      console.log("headers", {
        // headers: res.headers,
        auth: res.headers.get("authorization"),
        refreshToken: res.headers.get("refresh-token"),
      });

      // Handle Recieved Auth headers if present
      const auth = res.headers.get("authorization");
      if (auth) saveToStorage("auth", auth);

      const refreshToken = res.headers.get("refresh-token");
      if (refreshToken) saveToStorage("refreshToken", refreshToken);

      const data = await res.json();

      if (data?.errors) {
        const { message } = data.errors[0];

        throw new Error(message, { cause: res.status });
      }

      console.log("mutation data:", { data });

      return data;
    },
    ...options,
  });
};

export default useMutation;
