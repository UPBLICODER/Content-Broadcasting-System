"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getMyContent } from "@/services/content.service";
import { TEACHERS } from "@/lib/constants";

export default function LivePage() {
  const { teacherId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacher = TEACHERS.find((t) => t.id === teacherId);
  const teacherName = teacher?.name || teacherId;

  // helper → determine whether content is currently live
  const isCurrentlyLive = (item) => {
    const now = new Date();
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);

    return item.status === "approved" && now >= start && now <= end;
  };

  const getActiveContent = (data) => {
    const now = new Date();

    return (data || []).filter((item) => {
      const start = new Date(item.startTime);
      const end = new Date(item.endTime);
      return item.status === "approved" && now >= start && now <= end;
    });
  };

  // fetch content with useCallback
  const loadData = useCallback(async () => {
    try {
      const data = await getMyContent(teacherId);
      const active = getActiveContent(data);
      setItems(active);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    loadData(); // eslint-disable-line react-hooks/set-state-in-effect

    // optional polling every 10s
    const interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="rounded-3xl bg-white shadow-lg p-12">
            <p className="text-slate-500 text-lg">Loading live content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="hover:opacity-75 transition">
                <h1 className="font-semibold text-lg text-slate-900">
                  Content Broadcasting System
                </h1>
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

        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <div className="rounded-3xl bg-white shadow-lg p-12 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                No Active Lesson
              </h1>
              <p className="text-slate-600 mb-8 text-lg">
                {teacherName} has no approved live lesson right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/live"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Browse Other Teachers
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="hover:opacity-75 transition">
              <h1 className="font-semibold text-lg text-slate-900">
                Content Broadcasting System
              </h1>
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

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
              {teacherName.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-slate-900">
                {teacherName}'s Live Lesson
              </h1>
              <p className="text-slate-600">
                Currently broadcasting approved content
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-semibold">LIVE NOW</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>📚 {item.subject}</span>
                    <span>
                      ⏰ {new Date(item.startTime).toLocaleTimeString()} -{" "}
                      {new Date(item.endTime).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Duration: {item.rotationDuration || "N/A"}
                  </span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/live"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            ← Browse Other Teachers
          </Link>
        </div>
      </div>
    </div>
  );
}
