import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import Layout from "../components/Layout";

import UserTable from "../components/UserTable";

import ConfirmModal from "../components/ConfirmModal";

const Users = () => {

  const [users, setUsers] =
    useState([]);

  const [selectedId, setSelectedId] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const navigate = useNavigate();



  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const response =
        await api.get("/");

      setUsers(
        response.data.users
      );

    } catch (error) {

      toast.error(
        "Failed to fetch users"
      );
    }
  };



  useEffect(() => {

    fetchUsers();

  }, []);




  // DELETE USER
  const handleDelete = async () => {

    try {

      await api.delete(
        `/${selectedId}`
      );

      toast.success(
        "User Deleted Successfully"
      );

      fetchUsers();

      setOpenModal(false);

    } catch (error) {

      toast.error(
        "Delete Failed"
      );
    }
  };



  return (

    <Layout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-slate-800">

          Users List

        </h2>

        <button
          onClick={() =>
            navigate("/add-user")
          }
          className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-700 transition"
        >
          Add User
        </button>
      </div>



      {/* USER TABLE */}

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