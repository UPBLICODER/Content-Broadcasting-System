import { approve } from "@/lib/mockContentStore";

export async function POST(req) {
  const body = await req.json();

  approve(body.id);

  return Response.json({ message: "Approved" });
}
