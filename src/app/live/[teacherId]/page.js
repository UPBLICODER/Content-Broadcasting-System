"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
      return (
        item.status === "approved" && now >= start && now <= end
      );
    });
  };

  // fetch content
  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();

    // optional polling every 10s
    const interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);
  }, [teacherId]);

  if (loading) {
    return (
      <div className="min-h-[56vh] flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading live content…</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="min-h-[56vh] flex items-center justify-center bg-slate-50 py-12">
        <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-semibold text-slate-900">No active lesson</h1>
          <p className="mt-3 text-slate-600">{teacherName} has no approved live lesson right now.</p>
          <Link
            href="/live"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to live page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{teacherName} live lesson</h1>
              <p className="mt-3 text-slate-600">Approved broadcast currently active for students.</p>
            </div>
            <Link
              href="/live"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{items[0].title}</h2>
              <p className="mt-2 text-sm text-slate-500">{items[0].subject}</p>
            </div>
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-green-800">
              Live now
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <DetailCard label="Start" value={items[0].startTime} />
            <DetailCard label="End" value={items[0].endTime} />
            <DetailCard label="File" value={items[0].fileName || "None"} />
          </div>

          {items[0].description ? (
            <p className="mt-6 text-slate-600">{items[0].description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-2">{value}</p>
    </div>
  );
}
