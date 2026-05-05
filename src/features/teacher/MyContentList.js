"use client";

import { useEffect, useState } from "react";
import { getMyContent } from "@/services/content.service";

export default function MyContentList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusStyles = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await getMyContent();
        setItems(data || []);
      } catch (err) {
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="text-gray-500">Loading content...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!items.length) {
    return <p className="text-gray-500">No content uploaded yet</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow space-y-2">
          {/* Title + Subject */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{item.title}</h3>

            <span className="text-sm text-gray-500">{item.subject}</span>
          </div>

          {/* Time */}
          <p className="text-sm text-gray-500">
            {item.startTime} → {item.endTime}
          </p>

          {/* Status Badge */}
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              statusStyles[item.status || "pending"]
            }`}
          >
            {item.status || "pending"}
          </span>

          {/* Rejection Reason */}
          {item.status === "rejected" && item.rejectionReason && (
            <p className="text-sm text-red-500">
              Reason: {item.rejectionReason}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}