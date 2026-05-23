import {
  FaEdit,
  FaTrash
} from "react-icons/fa";

const UserTable = ({
  users,
  onEdit,
  onDelete
}) => {

  return (

    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

      <table className="w-full">

        <thead className="bg-slate-800 text-white">

          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b hover:bg-gray-100"
            >

              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.phone}
              </td>

              <td className="p-4 capitalize">
                {user.role}
              </td>

              <td className="p-4 flex justify-center gap-4">

                <button
                  onClick={() =>
                    onEdit(user.id)
                  }
                  className="text-blue-500"
                >
                  <FaEdit size={20} />
                </button>

                <button
                  onClick={() =>
                    onDelete(user.id)
                  }
                  className="text-red-500"
                >
                  <FaTrash size={20} />
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