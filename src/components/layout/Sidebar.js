"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 h-screen bg-white border-r p-4">
      <h2 className="font-bold mb-4">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        {user.role === "teacher" && (
          <Link href="/dashboard/teacher">Teacher</Link>
        )}

        {user.role === "principal" && (
          <Link href="/dashboard/principal">Principal</Link>
        )}
      </nav>
    </aside>
  );
}
