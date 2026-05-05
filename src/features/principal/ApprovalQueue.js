"use client";

import { useEffect, useState } from "react";
import {
  getPendingApprovals,
  approveContent,
  rejectContent,
} from "@/services/approval.service";
import Button from "@/components/common/Button";

export default function ApprovalQueue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPendingApprovals();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveContent(id);

      // remove from UI
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectContent(id);

      // remove from UI
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!items.length) {
    return <p className="text-gray-500">No pending approvals</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handleApprove(item.id)}>Approve</Button>
            <Button onClick={() => handleReject(item.id)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}