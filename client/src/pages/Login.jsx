import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import Layout from "../components/Layout";

const Login = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    try {

      const response =
        await api.post(
          "/login",
          data
        );

      if (response.data.success) {

        localStorage.setItem(
          "isLoggedIn",
          true
        );

        toast.success(
          "Login Successful"
        );

        navigate("/users");
      }

    } catch (error) {

      toast.error(
        error.response.data.message
      );
    }
  };

  return (

    <Layout>

      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center mb-8">
          Login
        </h2>

        <div className="mb-5">

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required:
                "Email is required"
            })}
            className="w-full border p-3 rounded-lg"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.email?.message}
          </p>
        </div>

        <div className="mb-5">

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required:
                "Password is required"
            })}
            className="w-full border p-3 rounded-lg"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          className="w-full bg-slate-900 text-white py-3 rounded-lg"
        >
          Login
        </button>
        </form>

      </div>

    </Layout>
  );
};

export default Login;