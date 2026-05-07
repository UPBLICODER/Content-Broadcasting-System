"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(
        user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/principal",
      );
    }
  }, [user, loading, router]);

  if (loading || user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
      <div className="mx-auto max-w-7xl px-6 py-20 w-full">
        {/* Hero */}
        <div className="rounded-3xl bg-white shadow-lg p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Streamline <span className="text-blue-600">School Content</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              A simple platform for teachers to submit lessons, principals to
              review content, and students to access approved materials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Sign in
            </Link>
            <Link
              href="/live"
              className="px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
            >
              Browse Live
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "Teacher",
              desc: "Submit lessons, schedule broadcasts, and track approval status.",
              color: "from-blue-500 to-blue-600",
              href: "/dashboard/teacher",
            },
            {
              title: "Principal",
              desc: "Review submissions and approve content before publishing.",
              color: "from-purple-500 to-purple-600",
              href: "/dashboard/principal",
            },
            {
              title: "Student",
              desc: "Access live lessons and stay updated with approved content.",
              color: "from-green-500 to-green-600",
              href: "/live",
            },
          ].map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="block rounded-3xl bg-white shadow-sm p-6 border border-slate-200 hover:shadow-lg transition"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} mb-4`}
              />

              <h2 className="text-lg font-semibold text-slate-900">
                {card.title}
              </h2>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} School Workflow Platform
        </div>
      </div>
    </div>
  );
}
