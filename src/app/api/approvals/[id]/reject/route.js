import { reject } from "@/lib/mockContentStore";

export async function POST(req, { params }) {
  const body = await req.json();

  reject(params.id, body.reason);

  return Response.json({
    message: "Rejected",
  });
}
