"use client";

import { useState, useCallback } from "react";
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
  const [copiedInfo, setCopiedInfo] = useState({ email: "", field: "" });

  const accounts = [
    { email: "alice@school.com", password: "teacher123" },
    { email: "david@school.com", password: "teacher123" },
    { email: "priya@school.com", password: "teacher123" },
    { email: "principal@school.com", password: "principal123" },
  ];

  const copyToClipboard = useCallback(async (text, email, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedInfo({ email, field });
      window.setTimeout(() => setCopiedInfo({ email: "", field: "" }), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }, []);

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
        <ul className="space-y-3 mt-3">
          {accounts.map((account) => (
            <li
              key={account.email}
              className="group rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 group">
                  <span className="font-medium text-slate-900">
                    {account.email}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(account.email, account.email, "email")
                    }
                    className="opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-slate-900"
                    aria-label={`Copy email ${account.email}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M9 4.5A2.5 2.5 0 0 0 6.5 7v11A2.5 2.5 0 0 0 9 20.5h7a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 16 4.5H9zM8 7A1 1 0 0 1 9 6h7a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7z" />
                      <path
                        d="M7 8.5A2.5 2.5 0 0 0 4.5 11v9A2.5 2.5 0 0 0 7 22.5h7A2.5 2.5 0 0 0 16.5 20V11A2.5 2.5 0 0 0 14 8.5H7z"
                        opacity=".4"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 group">
                  <span className="text-slate-600">{account.password}</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        account.password,
                        account.email,
                        "password",
                      )
                    }
                    className="opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-slate-900"
                    aria-label={`Copy password for ${account.email}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M9 4.5A2.5 2.5 0 0 0 6.5 7v11A2.5 2.5 0 0 0 9 20.5h7a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 16 4.5H9zM8 7A1 1 0 0 1 9 6h7a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7z" />
                    </svg>
                  </button>
                </div>
              </div>
              {copiedInfo.email === account.email &&
                copiedInfo.field === "email" && (
                  <p className="mt-2 text-xs text-green-600">Email copied!</p>
                )}
              {copiedInfo.email === account.email &&
                copiedInfo.field === "password" && (
                  <p className="mt-2 text-xs text-green-600">
                    Password copied!
                  </p>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
