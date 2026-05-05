export default function LiveStream({ teacherId }) {
  return (
    <div className="p-4">
      <h2 className="font-bold">Live Class</h2>
      <p>Streaming for teacher: {teacherId}</p>
    </div>
  );
}
