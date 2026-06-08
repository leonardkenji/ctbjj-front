import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "PROFESSOR" | "ADMIN";
}

const postUser = async (payload: CreateUserPayload) => {
  const response = await axios.post(`${API_URL}/users`, payload);
  return response.data;
};

export function useUserCreate() {
  return useMutation({
    mutationFn: postUser,
  });
}
