import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../lib/api";
import PageLoader from "../components/PageLoader.jsx";
import UserCard from "../components/UserCard.jsx";
import useAuthUser from "../hooks/useAuthUser";

export default function Dashboard() {
  const { authUser } = useAuthUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
  });

  if (isLoading) return <PageLoader />;
  if (error) return <div className="p-6">Failed to load users.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Welcome, {authUser?.fullName}</h1>
      <div className="grid gap-3">
        {data?.length ? (
          data.map((u) => <UserCard key={u._id} user={u} />)
        ) : (
          <div className="opacity-70">No other users yet.</div>
        )}
      </div>
    </div>
  );
}
