import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { professorsApi } from "../api/resources";

export function useProfessorsData() {
  return useQuery({
    queryKey: ["professors"],
    queryFn: professorsApi.list,
  });
}

export function useCreateProfessor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: professorsApi.create,
    onSuccess: () => {
      toast.success("Professor criado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["professors"] });
    },
    onError: () => toast.error("Não foi possível criar o professor."),
  });
}

export function useUpdateProfessor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof professorsApi.update>[1] }) =>
      professorsApi.update(id, payload),
    onSuccess: () => {
      toast.success("Professor atualizado.");
      queryClient.invalidateQueries({ queryKey: ["professors"] });
    },
    onError: () => toast.error("Não foi possível atualizar o professor."),
  });
}

export function useDeleteProfessor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: professorsApi.remove,
    onSuccess: () => {
      toast.success("Professor removido.");
      queryClient.invalidateQueries({ queryKey: ["professors"] });
    },
    onError: () => toast.error("Não foi possível remover o professor."),
  });
}
