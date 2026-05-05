"use client";

import useAuth from "@/hooks/useAuth";
import Button from "../common/Button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b p-4 flex justify-between">
      <h1 className="font-semibold">Broadcast System</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{user?.role}</span>
        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}
