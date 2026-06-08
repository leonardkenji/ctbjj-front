import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { checkinsApi, studentsApi } from "../api/resources";
import { useAuth } from "./useAuth";
import { isToday } from "../utils/format";

export function useStudents(page = 0, size = 20) {
  return useQuery({
    queryKey: ["students", page, size],
    queryFn: () => studentsApi.list(page, size),
  });
}

export function useStudentSearch(name: string) {
  return useQuery({
    queryKey: ["students", "search", name],
    queryFn: () => studentsApi.search(name),
    enabled: name.trim().length > 0,
  });
}

export function useCurrentStudent() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["students", "me"],
    queryFn: () => studentsApi.me(),
    enabled: Boolean(user?.id && user.role === "STUDENT"),
  });
}

export function useStudentStats(studentId?: string) {
  return useQuery({
    queryKey: ["checkins", "stats", studentId],
    queryFn: () => checkinsApi.stats(studentId!),
    enabled: Boolean(studentId),
  });
}

export function useStudentHistory(studentId?: string, page = 0) {
  return useQuery({
    queryKey: ["checkins", "history", studentId, page],
    queryFn: () => checkinsApi.history(studentId!, page),
    enabled: Boolean(studentId),
  });
}

export function useTodayCheckins() {
  const studentsQuery = useStudents(0, 50);
  const historyQueries = useQueries({
    queries: (studentsQuery.data?.content ?? []).map((student) => ({
      queryKey: ["checkins", "history", student.id, 0],
      queryFn: () => checkinsApi.history(student.id, 0),
      enabled: Boolean(student.id),
    })),
    combine(results) {
      const items = results
        .flatMap((query) => query.data?.content ?? [])
        .filter((entry) => isToday(entry.checkInTime))
        .sort((a, b) => +new Date(b.checkInTime) - +new Date(a.checkInTime));
      return {
        data: items,
        isLoading: results.some((query) => query.isLoading) || studentsQuery.isLoading,
      };
    },
  });

  return historyQueries;
}

function useStudentMutationSuccess(message: string) {
  const queryClient = useQueryClient();
  return () => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ["students"] });
    queryClient.invalidateQueries({ queryKey: ["checkins"] });
  };
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: studentsApi.create,
    onSuccess: useStudentMutationSuccess("Aluno criado com sucesso."),
    onError: () => toast.error("Não foi possível criar o aluno."),
  });
}

export function useUpdateStudent() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof studentsApi.update>[1] }) =>
      studentsApi.update(id, payload),
    onSuccess: useStudentMutationSuccess("Aluno atualizado com sucesso."),
    onError: () => toast.error("Não foi possível atualizar o aluno."),
  });
}

export function useUpdateStudentStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Parameters<typeof studentsApi.updateStatus>[1] }) =>
      studentsApi.updateStatus(id, status),
    onSuccess: useStudentMutationSuccess("Status atualizado."),
    onError: () => toast.error("Não foi possível atualizar o status."),
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentsApi.remove,
    onSuccess: () => {
      toast.success("Aluno removido.");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: () => toast.error("Não foi possível remover o aluno."),
  });
}
