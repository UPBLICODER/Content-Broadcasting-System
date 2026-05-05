import { approve } from "@/lib/mockContentStore";

export async function POST(req, { params }) {
  const { id } = await params;
  approve(id);

  return Response.json({
    message: "Approved",
  });
}
