// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg">Oops! The page you’re looking for doesn’t exist.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">Go Home</a>
    </div>
  );
}
