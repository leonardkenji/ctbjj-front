import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { classTypesApi, schedulesApi } from "../api/resources";

export function useAllSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: schedulesApi.list,
  });
}

export function useScheduleToday() {
  return useQuery({
    queryKey: ["schedules", "today"],
    queryFn: schedulesApi.today,
  });
}

export function useClassTypes() {
  return useQuery({
    queryKey: ["classTypes"],
    queryFn: classTypesApi.list,
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schedulesApi.create,
    onSuccess: () => {
      toast.success("Aula criada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => toast.error("Não foi possível criar a aula."),
  });
}

export function useUpdateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof schedulesApi.update>[1] }) =>
      schedulesApi.update(id, payload),
    onSuccess: () => {
      toast.success("Aula atualizada.");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => toast.error("Não foi possível atualizar a aula."),
  });
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schedulesApi.remove,
    onSuccess: () => {
      toast.success("Aula removida.");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => toast.error("Não foi possível remover a aula."),
  });
}

export function useCreateClassType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classTypesApi.create,
    onSuccess: () => {
      toast.success("Tipo de aula criado.");
      queryClient.invalidateQueries({ queryKey: ["classTypes"] });
    },
    onError: () => toast.error("Não foi possível criar o tipo de aula."),
  });
}

export function useUpdateClassType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof classTypesApi.update>[1] }) =>
      classTypesApi.update(id, payload),
    onSuccess: () => {
      toast.success("Tipo de aula atualizado.");
      queryClient.invalidateQueries({ queryKey: ["classTypes"] });
    },
    onError: () => toast.error("Não foi possível atualizar o tipo de aula."),
  });
}

export function useDeleteClassType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classTypesApi.remove,
    onSuccess: () => {
      toast.success("Tipo de aula removido.");
      queryClient.invalidateQueries({ queryKey: ["classTypes"] });
    },
    onError: () => toast.error("Não foi possível remover o tipo de aula."),
  });
}
