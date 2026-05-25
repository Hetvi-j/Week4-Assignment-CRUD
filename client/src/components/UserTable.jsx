import {
  FaEdit,
  FaTrash
} from "react-icons/fa";

const UserTable = ({
  users,
  onEdit,
  onDelete
}) => {

  const getRoleBadgeColor = (role) => {
    const roleColors = {
      admin: "bg-purple-100 text-purple-800",
      editor: "bg-blue-100 text-blue-800",
      user: "bg-green-100 text-green-800"
    };
    return roleColors[role?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (users.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-slate-500 text-lg">No users found</div>
        <p className="text-slate-400 mt-2">Create your first user to get started</p>
      </div>
    );
  }

  return (

    <div className="overflow-y-auto h-full">

      <table className="w-full">

        <thead className="sticky top-0 z-10">

          <tr className="bg-gradient-to-r from-slate-900 to-slate-700 text-white border-b-2 border-slate-700">
            <th className="p-5 text-left font-semibold text-sm uppercase tracking-wide">Name</th>
            <th className="p-5 text-left font-semibold text-sm uppercase tracking-wide">Email</th>
            <th className="p-5 text-left font-semibold text-sm uppercase tracking-wide">Phone</th>
            <th className="p-5 text-left font-semibold text-sm uppercase tracking-wide">Role</th>
            <th className="p-5 text-center font-semibold text-sm uppercase tracking-wide">Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (

            <tr
              key={user.id}
              className={`border-b transition duration-200 hover:bg-slate-50 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >

              <td className="p-5 font-medium text-slate-900">
                {user.name}
              </td>

              <td className="p-5 text-slate-700">
                {user.email}
              </td>

              <td className="p-5 text-slate-700">
                {user.phone}
              </td>

              <td className="p-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  getRoleBadgeColor(user.role)
                }`}>
                  {user.role}
                </span>
              </td>

              <td className="p-5 flex justify-center gap-3">

                <button
                  onClick={() =>
                    onEdit(user.id)
                  }
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-200 hover:shadow-md"
                  title="Edit user"
                >
                  <FaEdit size={18} />
                </button>

                <button
                  onClick={() =>
                    onDelete(user.id)
                  }
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition duration-200 hover:shadow-md"
                  title="Delete user"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;