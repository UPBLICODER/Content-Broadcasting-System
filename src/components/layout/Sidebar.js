"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 h-screen bg-white border-r p-5">
      <h2 className="font-bold mb-6 text-slate-900">Dashboard</h2>

      <nav className="flex flex-col gap-2 text-sm">
        {user.role === "teacher" && (
          <Link
            href="/dashboard/teacher"
            className="px-3 py-2 rounded-lg font-bold text-purple-700 hover:bg-slate-100 transition"
          >
            Home
          </Link>
        )}

        {user.role === "principal" && (
          <Link
            href="/dashboard/principal"
            className="px-3 py-2 rounded-lg font-bold text-purple-700 hover:bg-slate-100 transition"
          >
            Home
          </Link>
        )}
      </nav>
    </aside>
  );
}
