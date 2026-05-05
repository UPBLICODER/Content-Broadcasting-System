import { approve } from "@/lib/mockContentStore";

export async function POST(req, { params }) {
  approve(params.id);

  return Response.json({
    message: "Approved",
  });
}
