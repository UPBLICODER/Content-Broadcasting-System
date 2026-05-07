import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "mockData.json");

// Initialize data
let content = [];
try {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, "utf8");
    content = JSON.parse(data);
  } else {
    // Default data
    content = [
      {
        id: 1,
        title: "Math Lecture - Algebra Basics",
        subject: "Math",
        status: "pending",
        teacherId: "teacher-1",
        startTime: "2026-05-05T10:00",
        endTime: "2026-05-05T12:00",
      },
      {
        id: 2,
        title: "Physics - Newton Laws",
        subject: "Physics",
        status: "approved",
        teacherId: "teacher-2",
        startTime: "2026-05-04T09:00",
        endTime: "2026-05-04T11:00",
      },
      {
        id: 3,
        title: "Chemistry - Organic Compounds",
        subject: "Chemistry",
        status: "rejected",
        teacherId: "teacher-3",
        rejectionReason: "Content not aligned with syllabus",
        startTime: "2026-05-03T13:00",
        endTime: "2026-05-03T15:00",
      },
      {
        id: 4,
        title: "History - World War II",
        subject: "History",
        status: "pending",
        teacherId: "teacher-1",
        startTime: "2026-05-07T09:00",
        endTime: "2026-05-07T10:30",
      },
    ];
    fs.writeFileSync(dataFilePath, JSON.stringify(content, null, 2));
  }
} catch (error) {
  console.error("Error loading mock data:", error);
  content = [];
}

// Helper to save data
function saveData() {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(content, null, 2));
  } catch (error) {
    console.error("Error saving mock data:", error);
  }
}

// READ
export function getContent() {
  return content;
}

// ADD (teacher upload)
export function addContent(item) {
  content.unshift(item);
  saveData();
}

// APPROVE
export function approve(id) {
  content = content.map((item) =>
    item.id === Number(id) ? { ...item, status: "approved" } : item,
  );
  saveData();
}

// REJECT
export function reject(id, reason) {
  content = content.map((item) =>
    item.id === Number(id)
      ? { ...item, status: "rejected", rejectionReason: reason }
      : item,
  );
  saveData();
}
