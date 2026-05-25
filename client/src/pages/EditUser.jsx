import {useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import api from "../services/api";
import Layout from "../components/Layout";

const EditUser = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();




  // FETCH SINGLE USER
  const fetchUser = async () => {

    try {

      const response =
        await api.get(`/${id}`);

      const user =
        response.data.user;

      setValue(
        "name",
        user.name
      );

      setValue(
        "email",
        user.email
      );

      setValue(
        "phone",
        user.phone
      );

      setValue(
        "password",
        user.password
      );

      setValue(
        "role",
        user.role
      );

    } catch (error) {

      toast.error(
        "Failed to fetch user"
      );
    }
  };



  useEffect(() => {

    fetchUser();

  }, []);




  // UPDATE USER
  const onSubmit = async (
    data
  ) => {

    try {

      await api.put(
        `/${id}`,
        data
      );

      toast.success(
        "User Updated Successfully"
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

          Edit User

        </h2>



        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* NAME */}

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



          {/* EMAIL */}

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



          {/* PHONE */}

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



          {/* PASSWORD */}

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



          {/* ROLE */}

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



          {/* BUTTON */}

          <button
            className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Update User
          </button>
        </form>
      </div>

    </Layout>
  );
};

export default EditUser;