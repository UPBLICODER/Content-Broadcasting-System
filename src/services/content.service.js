import api from "./api";

// teacher: get own content
export async function getMyContent() {
  try {
    return await api.get("/content/my");
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
