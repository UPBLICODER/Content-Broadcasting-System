"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import {
  getAllContent,
  getPendingApprovals,
} from "@/services/approval.service";

export default function PrincipalPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");

  // role protection
  useEffect(() => {
    if (!loading && (!user || user.role !== "principal")) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoadingData(true);
        const [pendingItems, allItems] = await Promise.all([
          getPendingApprovals(),
          getAllContent(),
        ]);

        const allList = allItems || [];

        setStats({
          total: allList.length,
          approved: allList.filter((item) => item.status === "approved").length,
          pending: pendingItems?.length || 0,
          rejected: allList.filter((item) => item.status === "rejected").length,
        });
      } catch (err) {
        setDataError("Unable to load dashboard metrics");
      } finally {
        setLoadingData(false);
      }
    }

    if (user?.role === "principal") {
      loadStats();
    }
  }, [user]);

  // auth loading
  if (loading) return null;

  // unauthorized
  if (!user || user.role !== "principal") return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Principal dashboard</h1>
          <p className="text-sm text-gray-500">
            Review teacher lesson submissions and approve the best content for
            student access.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="hidden sm-block bg-gray-200 px-4 py-2 rounded text-center">
            Home
          </Link>
          <Link
            href="/dashboard/principal/pending"
            className="bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Pending approvals
          </Link>
          <Link
            href="/dashboard/principal/all"
            className="bg-gray-200 px-4 py-2 rounded text-center"
          >
            View all submissions
          </Link>
        </div>
      </div>

      {dataError && <p className="text-red-500">{dataError}</p>}

      {loadingData ? (
        <p className="text-gray-500">Loading dashboard metrics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total lessons" value={stats.total} />
          <StatCard title="Pending review" value={stats.pending} />
          <StatCard title="Approved" value={stats.approved} />
          <StatCard title="Rejected" value={stats.rejected} />
        </div>
      )}

      <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-sm text-green-900">
        Students only gain access to lessons after approval. Use this dashboard
        to keep the content library trusted and up to date.
      </div>
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
