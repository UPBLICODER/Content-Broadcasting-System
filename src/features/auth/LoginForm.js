"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password is required"),
});

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMessage("");
      await login(data);
    } catch (error) {
      setErrorMessage(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <h2 className="mb-4 text-xl font-semibold">Sign in</h2>
      <p className="text-sm text-gray-500 mb-4">
        Use the email and password for your teacher or principal account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full border rounded p-2"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 w-full border rounded p-2"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-4 rounded-lg bg-gray-50 border p-3 text-sm text-gray-700">
        Example accounts:
        <ul className="list-disc ml-5 mt-2 text-gray-600">
          <li>alice@school.com / teacher123</li>
          <li>david@school.com / teacher123</li>
          <li>priya@school.com / teacher123</li>
          <li>principal@school.com / principal123</li>
        </ul>
      </div>
    </div>
  );
}
