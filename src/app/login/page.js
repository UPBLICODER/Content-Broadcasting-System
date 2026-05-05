"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import LoginForm from "@/features/auth/LoginForm";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(
        user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/principal",
      );
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <div className="h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
