"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function PrincipalPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // role protection
  useEffect(() => {
    if (!loading && (!user || user.role !== "principal")) {
      router.push("/login");
    }
  }, [user, loading]);

  // auth loading
  if (loading) return null;

  // unauthorized
  if (!user || user.role !== "principal") return null;

  return (
    <div className="space-y-4">

      <h1 className="text-xl font-semibold">
        Principal Dashboard
      </h1>

      <div className="flex gap-3">

        <Link
          href="/dashboard/principal/pending"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pending Approvals
        </Link>

        <Link
          href="/dashboard/principal/all"
          className="bg-gray-200 px-4 py-2 rounded"
        >
          All Content
        </Link>

      </div>

    </div>
  );
}