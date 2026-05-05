import { getContent } from "@/lib/mockContentStore";

export async function GET() {
  return Response.json(getContent().filter((c) => c.status === "pending"));
}
