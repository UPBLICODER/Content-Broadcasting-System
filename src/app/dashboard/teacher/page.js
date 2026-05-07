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
        const data = await getMyContent(user?.id);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, <span className="text-purple-900">{user.name}</span>
          </h1>
          <p className="text-sm text-gray-500">
            Submit lessons for review and track whether they are approved for
            student viewing.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Link
            href="/"
            className="block sm:hidden bg-gray-200 px-4 py-2 rounded text-center"
          >
            Home
          </Link>
          <Link
            href="/dashboard/teacher/upload"
            className="bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Upload
          </Link>
          <Link
            href={`/live/${user.id}`}
            className="bg-gray-200 px-4 py-2 rounded text-center"
          >
            My Approved Content
          </Link>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading your teaching dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total uploads" value={stats.total} />
          <StatCard title="Waiting review" value={stats.pending} />
          <StatCard title="Approved" value={stats.approved} />
          <StatCard title="Rejected" value={stats.rejected} />
        </div>
      )}

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        Approved lessons are published for students. Pending items remain
        visible here until the principal approves or rejects them.
      </div>

      <section className="space-y-3">
        <h3 className="font-bold text-lg">My recent lessons</h3>
        <MyContentList teacherId={user.id} />
      </section>
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
