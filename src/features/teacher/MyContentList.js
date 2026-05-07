"use client";

import { useEffect, useState } from "react";
import { getMyContent } from "@/services/content.service";

export default function MyContentList({ teacherId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusStyles = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    scheduled: "bg-blue-100 text-blue-700",
    live: "bg-green-200 text-green-800",
    expired: "bg-gray-100 text-gray-700",
  };

  const getScheduleStatus = (item) => {
    const now = new Date();
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);

    if (item.status === "rejected") return "rejected";
    if (item.status === "pending") return "pending";
    if (now < start) return "scheduled";
    if (now >= start && now <= end) return "live";
    return "expired";
  };

  useEffect(() => {
    async function load() {
      if (!teacherId) {
        setError("Unable to load teacher content");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyContent(teacherId);
        setItems(data || []);
      } catch (err) {
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [teacherId]);

  if (loading) return <p className="text-gray-500">Loading content...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!items.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-500">
        You haven’t uploaded any lessons yet. Use the upload page to submit a
        lesson for approval.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subject}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                statusStyles[getScheduleStatus(item)]
              }`}
            >
              {getScheduleStatus(item).toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            {item.startTime} → {item.endTime}
          </p>

          {item.status === "rejected" && item.rejectionReason && (
            <p className="text-sm text-red-500">
              Rejection reason: {item.rejectionReason}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
