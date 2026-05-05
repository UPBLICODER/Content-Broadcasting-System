"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  getPendingApprovals,
  approveContent,
  rejectContent,
} from "@/services/approval.service";

export default function PendingApprovalPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // role protection
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "principal")) {
      router.push("/login");
    }
  }, [user, authLoading]);

  // fetch data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getPendingApprovals();
        setItems(data || []);
      } catch (err) {
        setError("Failed to load pending approvals");
      } finally {
        setLoading(false);
      }
    }

    if (user?.role === "principal") {
      loadData();
    }
  }, [user]);

  async function handleApprove(id) {
    try {
      await approveContent(id);
      // Refetch data instead of filtering local state
      const data = await getPendingApprovals();
      setItems(data || []);
    } catch (err) {
      alert("Approve failed");
    }
  }

  function openRejectModal(id) {
    setSelectedId(id);
    setReason("");
    setModalOpen(true);
  }

  async function submitReject() {
    if (!reason.trim()) {
      alert("Rejection reason is required");
      return;
    }

    try {
      await rejectContent(selectedId, reason);

      // Refetch data instead of filtering local state
      const data = await getPendingApprovals();
      setItems(data || []);

      setModalOpen(false);
      setSelectedId(null);
      setReason("");
    } catch (err) {
      alert("Reject failed");
    }
  }

  if (authLoading) return null;

  if (!user || user.role !== "principal") return null;

  if (loading) return <p className="text-gray-500">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!items.length) {
    return <p className="text-gray-500">No pending approvals</p>;
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Preview</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.subject}</td>

                <td className="p-3">
                  {item.fileName ? (
                    <span className="text-blue-600 text-xs">
                      {item.fileName}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => openRejectModal(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96 space-y-3">
            <h2 className="font-semibold">Reject Content</h2>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter rejection reason"
              className="w-full border p-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={submitReject}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
