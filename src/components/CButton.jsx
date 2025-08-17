export default function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="absolute right-3 top-3 z-10 px-3 py-1.5 border rounded bg-white hover:bg-gray-50"
    >
      Start Call
    </button>
  );
}
