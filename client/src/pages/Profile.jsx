import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Profile = () => {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  const initials = user && user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()
    : "U";

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-lg font-semibold">No user data available.</div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/users')}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg"
              >
                Back to Users
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-white border border-slate-300 px-4 py-2 rounded-lg"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900">User Profile</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Avatar Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-8 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-slate-900 shadow-lg">
                {initials}
              </div>
              <h2 className="text-2xl font-bold text-white mt-4">{user.name}</h2>
              <p className="text-slate-300 text-sm mt-1">{user.email}</p>
            </div>

            {/* Info Section */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
                  <p className="text-lg font-medium text-slate-900">{user.name}</p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email Address</label>
                  <p className="text-lg font-medium text-slate-900 break-all">{user.email}</p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone Number</label>
                  <p className="text-lg font-medium text-slate-900">{user.phone || "Not provided"}</p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">User Role</label>
                  <div className="inline-block">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-8 border-slate-200" />

              {/* Action Section */}
              <div className="flex justify-end">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
