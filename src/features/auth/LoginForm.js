"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import useAuth from "@/hooks/useAuth";

export default function LoginForm() {
  const [role, setRole] = useState("teacher");
  const { login } = useAuth();

  const handleLogin = () => {
    login({ role });
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80">
      <h2 className="mb-4 font-semibold">Login</h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="teacher">Teacher</option>
        <option value="principal">Principal</option>
      </select>

      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
