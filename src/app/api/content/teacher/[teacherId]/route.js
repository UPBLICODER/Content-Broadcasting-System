import { getContent } from "@/lib/mockContentStore";

export async function GET(req, { params }) {
  const { teacherId } = await params;

  const content = getContent().filter((item) => item.teacherId === teacherId);

  return Response.json(content);
}
