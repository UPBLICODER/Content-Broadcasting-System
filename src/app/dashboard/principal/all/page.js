"use client";

import { useEffect, useState } from "react";
import { getPendingApprovals } from "@/services/approval.service";
import useRoleGuard from "@/hooks/useRoleGuard";

export default function AllContentPage() {
  const { user, loading } = useRoleGuard("principal");

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  // fetch data
  useEffect(() => {
    async function load() {
      try {
        setLoadingData(true);

        const data = await getPendingApprovals();

        setItems(data || []);
        setFiltered(data || []);
      } catch (err) {
        setError("Failed to load content");
      } finally {
        setLoadingData(false);
      }
    }

    if (user?.role === "principal") {
      load();
    }
  }, [user]);

  // filtering
  useEffect(() => {
    let data = [...items];

    if (statusFilter !== "all") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (search.trim()) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFiltered(data);
  }, [statusFilter, search, items]);

  if (loading) return null;
  if (!user) return null;

  if (loadingData) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="border p-2 rounded w-64"
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-gray-500">No content found</p>
      )}

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow space-y-1">
            <div className="flex justify-between">
              <h3 className="font-semibold">{item.title}</h3>
              <span className="text-sm text-gray-500">{item.subject}</span>
            </div>

            <p className="text-xs text-gray-500">
              {item.startTime} → {item.endTime}
            </p>

            <p className="text-xs font-medium">
              Status:{" "}
              <span
                className={
                  item.status === "approved"
                    ? "text-green-600"
                    : item.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                }
              >
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
