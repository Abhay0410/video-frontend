import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="border rounded p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}`}
          className="w-10 h-10 rounded-full object-cover"
          alt="user avatar"
        />
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="text-sm opacity-70">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/chat/${user._id}`} className="px-3 py-1.5 border rounded hover:bg-gray-50">
          Chat
        </Link>
        <Link to={`/call/${user._id}`} className="px-3 py-1.5 border rounded hover:bg-gray-50">
          Call
        </Link>
      </div>
    </div>
  );
}
