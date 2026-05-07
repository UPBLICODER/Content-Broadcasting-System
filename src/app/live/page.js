"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyContent } from "@/services/content.service";
import { TEACHERS } from "@/lib/constants";

const teacherAccounts = TEACHERS.filter((teacher) => teacher.role === "teacher");

export default function LiveIndexPage() {
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
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Live lessons</h1>
              <p className="mt-3 text-slate-600">Active approved teacher broadcasts for students.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {teacherAccounts.map((teacher) => {
            const activeCount = activeCounts[teacher.id] || 0;
            return (
              <Link
                key={teacher.id}
                href={`/live/${teacher.id}`}
                className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{teacher.name}</h2>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activeCount > 0 ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}`}>
                    {loading ? "..." : activeCount > 0 ? `${activeCount} live` : "No live"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
