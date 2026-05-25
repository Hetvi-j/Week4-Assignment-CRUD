import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import Layout from "../components/Layout";
import UserTable from "../components/UserTable";
import ConfirmModal from "../components/ConfirmModal";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const response = await api.get("/");
      setUsers(response.data.users);

    } catch (error) {

      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);


  // DELETE USER
  const handleDelete = async () => {

    try {

      await api.delete(`/${selectedId}`);
      toast.success("User Deleted Successfully");
      fetchUsers();
      setOpenModal(false);

    } catch (error) {

      toast.error("Delete Failed");
    }
  };



  return (

    <Layout>

      <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-slate-50 to-slate-100 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-8 flex justify-between items-start">

            <div>
              <h1 className="text-4xl font-bold text-slate-900">Users Management</h1>
        
            </div>

            <button
              onClick={() =>
                navigate("/add-user")
              }
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              + Add User
            </button>
          </div>



          {/* USER TABLE */}

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-h-[calc(100vh-280px)] flex flex-col">
            <UserTable
              users={users}
              onEdit={(id) =>
                navigate(
                  `/edit-user/${id}`
                )
              }
              onDelete={(id) => {

                setSelectedId(id);

                setOpenModal(true);
              }}
            />
          </div>
        </div>
      </div>



      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onConfirm={handleDelete}
      />
    </Layout>
  );
};

export default Users;