import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  })();

  const initials = user && user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()
    : "U";

  return (
    <div className="bg-slate-900 text-white px-8 py-6 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-6">
        <h1 className="text-4xl font-extrabold tracking-wide">
          User Management System
        </h1>
      </div>

      {isLoggedIn && (
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold"
          aria-label="Profile"
        >
          {initials}
        </button>
      )}
    </div>
  );
};

export default Navbar;