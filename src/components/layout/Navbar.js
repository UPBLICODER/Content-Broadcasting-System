"use client";

import useAuth from "@/hooks/useAuth";
import Button from "../common/Button";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <Link href="/" className="hover:opacity-75 transition">
            <h1 className="font-semibold text-lg text-slate-900">School Workflow</h1>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm text-slate-700">{user?.name}</span>
            </div>

            <Button onClick={logout} className="text-sm px-3 py-1 sm:px-4 sm:py-2">Logout</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
