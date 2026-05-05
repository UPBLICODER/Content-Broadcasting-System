let content = [
  {
    id: 1,
    title: "Math Lecture - Algebra Basics",
    subject: "Math",
    status: "pending",
    startTime: "2026-05-05T10:00",
    endTime: "2026-05-05T12:00",
  },
  {
    id: 2,
    title: "Physics - Newton Laws",
    subject: "Physics",
    status: "approved",
    startTime: "2026-05-04T09:00",
    endTime: "2026-05-04T11:00",
  },
  {
    id: 3,
    title: "Chemistry - Organic Compounds",
    subject: "Chemistry",
    status: "rejected",
    rejectionReason: "Content not aligned with syllabus",
    startTime: "2026-05-03T13:00",
    endTime: "2026-05-03T15:00",
  },
  {
    id: 4,
    title: "History - World War II",
    subject: "History",
    status: "pending",
    startTime: "2026-05-07T09:00",
    endTime: "2026-05-07T10:30",
  },
];

// READ
export function getContent() {
  return content;
}

// ADD (teacher upload)
export function addContent(item) {
  content.unshift(item);
}

// APPROVE
export function approve(id) {
  content = content.map((item) =>
    item.id === Number(id) ? { ...item, status: "approved" } : item,
  );
}

// REJECT
export function reject(id, reason) {
  content = content.map((item) =>
    item.id === Number(id)
      ? { ...item, status: "rejected", rejectionReason: reason }
      : item,
  );
}
