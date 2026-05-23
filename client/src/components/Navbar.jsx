import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  return (
    <div className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold tracking-wide">
        User Management
      </h1>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;