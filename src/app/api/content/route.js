import { getContent, addContent } from "@/lib/mockContentStore";

export async function GET() {
  return Response.json(getContent());
}

export async function POST(req) {
  const formData = await req.formData();

  const newContent = {
    id: Date.now(),
    title: formData.get("title"),
    subject: formData.get("subject"),
    description: formData.get("description"),
    status: "pending",
    fileName: formData.get("file")?.name,
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    rotationDuration: formData.get("rotationDuration"),
  };

  addContent(newContent);

  return Response.json({
    message: "Content created successfully",
    data: newContent,
  });
}
