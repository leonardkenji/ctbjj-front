import { useQuery } from "@tanstack/react-query";

import { professorsApi, schedulesApi } from "../api/resources";

export function useTodaySchedules() {
  return useQuery({
    queryKey: ["schedules", "today"],
    queryFn: schedulesApi.today,
  });
}

export function useSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: schedulesApi.list,
  });
}

export function useProfessors() {
  return useQuery({
    queryKey: ["professors"],
    queryFn: professorsApi.list,
  });
}
