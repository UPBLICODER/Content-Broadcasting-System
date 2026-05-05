import LiveStream from "@/features/public/LiveStream";

export default function LivePage({ params }) {
  return <LiveStream teacherId={params.teacherId} />;
}
