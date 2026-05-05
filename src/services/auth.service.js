import api from "./api";

export async function loginUser(payload) {
  try {
    const data = await api.post("/auth/login", payload);
    return data;
  } catch (error) {
    throw error;
  }
}
