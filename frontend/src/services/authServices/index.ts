import { AuthenticateInput, RootObject } from "@/@types";
import { useMutation } from "@tanstack/react-query";
import { mutationKeyFactory } from "../keyFactory";
import { Axios } from "../axios";
import { apiRoutes } from "../apiRoutes";

export async function authenticate(args: AuthenticateInput) {
  return await Axios.post(apiRoutes.authenticate, args);
}

export function useAuthenticateMutation() {
  return useMutation<RootObject, Error, AuthenticateInput, unknown>({
    mutationKey: mutationKeyFactory.authenticate(),
    mutationFn: async (args) => {
      const response = await authenticate(args);
      return response.data;
    },
    gcTime: 0,
  });
}
