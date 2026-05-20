import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="text-xl font-bold tracking-tight">QuickShare</span>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-indigo-200">Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-indigo-500 hover:bg-indigo-400 px-4 py-1.5 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
