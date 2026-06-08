import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "../api/resources";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.list,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      toast.success("Usuário criado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Não foi possível criar o usuário."),
  });
}
