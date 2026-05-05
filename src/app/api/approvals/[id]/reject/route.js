import { reject } from "@/lib/mockContentStore";

export async function POST(req, { params }) {
  const { id } = await params;
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { reason } = body;
  if (!reason || !reason.trim()) {
    return Response.json(
      { message: "Rejection reason is required" },
      { status: 400 },
    );
  }

  reject(id, reason.trim());

  return Response.json({
    message: "Rejected",
  });
}
