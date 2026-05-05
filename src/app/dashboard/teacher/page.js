"use client";

import { useEffect, useState } from "react";
import { getMyContent } from "@/services/content.service";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import MyContentList from "@/features/teacher/MyContentList";
import Link from "next/link";

export default function TeacherPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // role protection
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "teacher")) {
      router.push("/login");
    }
  }, [user, authLoading]);

  // fetch stats only (important fix)
  useEffect(() => {
    async function load() {
      try {
        const data = await getMyContent();

        const list = data || [];

        setStats({
          total: list.length,
          pending: list.filter((i) => i.status === "pending").length,
          approved: list.filter((i) => i.status === "approved").length,
          rejected: list.filter((i) => i.status === "rejected").length,
        });
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    if (user?.role === "teacher") load();
  }, [user]);

  if (authLoading) return null;
  if (!user || user.role !== "teacher") return null;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex gap-3">
        <Link
          href="/dashboard/teacher/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Content
        </Link>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Stats */}
      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total" value={stats.total} />
          <StatCard title="Pending" value={stats.pending} />
          <StatCard title="Approved" value={stats.approved} />
          <StatCard title="Rejected" value={stats.rejected} />
        </div>
      )}

      <h3 className="font-bold">My Content</h3>
      {/* List */}
      <MyContentList />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  );
}