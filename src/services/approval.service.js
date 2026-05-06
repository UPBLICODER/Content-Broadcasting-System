import api from "./api";

// principal: pending approvals
export async function getPendingApprovals() {
  try {
    return await api.get("/approvals/pending");
  } catch (error) {
    throw error;
  }
}

// principal: all content
export async function getAllContent() {
  try {
    return await api.get("/content");
  } catch (error) {
    throw error;
  }
}

// approve content
export async function approveContent(id) {
  try {
    return await api.post(`/approvals/${id}/approve`);
  } catch (error) {
    throw error;
  }
}

// reject content
export async function rejectContent(id, reason) {
  try {
    return await api.post(`/approvals/${id}/reject`, { reason });
  } catch (error) {
    throw error;
  }
}
