import api from "./api";

// teacher: get own content by teacher id
export async function getMyContent(teacherId) {
  try {
    if (!teacherId) {
      throw new Error("Teacher ID is required");
    }

    return await api.get(`/content/teacher/${teacherId}`);
  } catch (error) {
    throw error;
  }
}

// teacher: create content (NOW supports file upload)
export async function createContent(formData) {
  try {
    return await api.post("/content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
}
