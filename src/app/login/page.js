"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import LoginForm from "@/features/auth/LoginForm";
import Link from "next/link";

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Home link for public pages */}
      <div className="px-4 py-4 sm:px-6 lg:px-8 border-b">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            ← Back to home
          </Link>
        </div>
      </div>

      {/* Centered Login */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
