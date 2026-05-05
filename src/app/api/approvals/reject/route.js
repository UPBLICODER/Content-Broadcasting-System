import { reject } from "@/lib/mockStore";

export async function POST(req, { params }) {
  const body = await req.json();

  reject(params.id);

  return Response.json({
    message: "Rejected",
    reason: body.reason,
  });
}
