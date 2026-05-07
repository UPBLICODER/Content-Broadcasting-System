import { reject } from "@/lib/mockContentStore";

export async function POST(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  reject(id);

  return Response.json({
    message: "Rejected",
    reason: body.reason,
  });
}
