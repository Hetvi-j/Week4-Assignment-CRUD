import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import Layout from "../components/Layout";

const UserFormPage = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    try {

      await api.post(
        "/",
        data
      );

      toast.success(
        "User Added Successfully"
      );

      navigate("/users");

    } catch (error) {

      toast.error(
        error.response.data.message
      );
    }
  };

  return (

    <Layout>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold mb-8">
          Add User
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required:
                  "Name is required"
              })}
              className="w-full border p-3 rounded-lg"
            />

            <p className="text-red-500 text-sm">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required:
                  "Email is required"
              })}
              className="w-full border p-3 rounded-lg"
            />

            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone"
              {...register("phone", {
                required:
                  "Phone is required"
              })}
              className="w-full border p-3 rounded-lg"
            />

            <p className="text-red-500 text-sm">
              {errors.phone?.message}
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required:
                  "Password is required"
              })}
              className="w-full border p-3 rounded-lg"
            />

            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
          </div>

          <select
            {...register("role")}
            className="w-full border p-3 rounded-lg"
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="editor">
              Editor
            </option>
          </select>

          <button
            className="w-full bg-slate-900 text-white py-3 rounded-lg"
          >
            Add User
          </button>
        </form>
      </div>

    </Layout>
  );
};

export default UserFormPage;