import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            MiniLinkedIn
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <Link to="/" className="hover:text-blue-600">
              Feed
            </Link>
            <Link to="/create" className="hover:text-blue-600">
              Create Post
            </Link>
            <Link to="/profile" className="hover:text-blue-600">
              My Profile
            </Link>
            <button onClick={logout} className="hover:text-red-600">
              Logout
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1">
          <span className="block text-gray-900 font-bold px-3 pr-2">
            Welcome, {user?.name}
          </span>
          <Link to="/" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Feed
          </Link>
          <Link
            to="/create"
            className="block px-3 py-2 hover:bg-gray-100 rounded"
          >
            Create Post
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 hover:bg-gray-100 rounded"
          >
            My Profile
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
