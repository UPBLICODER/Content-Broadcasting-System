import { TEACHERS } from "@/lib/constants";

export async function loginUser(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const user = TEACHERS.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    token: "mock-token-frontend",
  };
}
