"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyContent } from "@/services/content.service";
import { TEACHERS } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";

const teacherAccounts = TEACHERS.filter((teacher) => teacher.role === "teacher");

export default function LiveIndexPage() {
  const { user } = useAuth();
  const [activeCounts, setActiveCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCounts() {
      try {
        setLoading(true);
        const results = await Promise.all(
          teacherAccounts.map(async (teacher) => {
            const data = await getMyContent(teacher.id);
            const now = new Date();
            const active = (data || []).filter((item) => {
              const start = new Date(item.startTime);
              const end = new Date(item.endTime);
              return item.status === "approved" && now >= start && now <= end;
            });
            return [teacher.id, active.length];
          }),
        );
        setActiveCounts(Object.fromEntries(results));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!isAuthTeacherOrPrincipal && (
       <>
        {/* Header */}
          <header className="bg-white border-b">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="hover:opacity-75 transition">
                  <h1 className="font-semibold text-lg text-slate-900">Content Broadcasting System</h1>
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </header>
      </>
     )}
    
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Live <span className="text-blue-600">Lessons</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Access currently active approved lessons from teachers. Select a teacher below to view their live content.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Loading live lessons...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teacherAccounts.map((teacher) => {
              const activeCount = activeCounts[teacher.id] || 0;
              return (
                <Link
                  key={teacher.id}
                  href={`/live/${teacher.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                      {teacher.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-slate-500">Teacher</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      {activeCount > 0 ? `${activeCount} live lesson${activeCount > 1 ? 's' : ''}` : 'No active lessons'}
                    </span>
                    {activeCount > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
