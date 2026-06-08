import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { checkinsApi } from "../api/resources";

export function useManualCheckin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkinsApi.manualCheckin,
    onSuccess: () => {
      toast.success("Check-in realizado.");
      queryClient.invalidateQueries({ queryKey: ["checkins"] });
    },
    onError: () => toast.error("Não foi possível registrar o check-in."),
  });
}

export function useQrCheckin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkinsApi.qrCheckin,
    onSuccess: () => {
      toast.success("Check-in via QR realizado.");
      queryClient.invalidateQueries({ queryKey: ["checkins"] });
    },
    onError: () => toast.error("Não foi possível registrar o check-in via QR."),
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkinsApi.checkout,
    onSuccess: () => {
      toast.success("Checkout realizado.");
      queryClient.invalidateQueries({ queryKey: ["checkins"] });
    },
    onError: () => toast.error("Não foi possível registrar o checkout."),
  });
}
