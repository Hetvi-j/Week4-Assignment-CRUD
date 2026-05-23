import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  Toaster
} from "react-hot-toast";

import Login from "./pages/Login";
import Users from "./pages/Users";
import UserFormPage from "./pages/UserFormPage";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />



        {/* USERS */}

        <Route
          path="/users"
          element={
            <ProtectedRoute>

              <Users />

            </ProtectedRoute>
          }
        />



        {/* ADD USER */}

        <Route
          path="/add-user"
          element={
            <ProtectedRoute>

              <UserFormPage />

            </ProtectedRoute>
          }
        />



        {/* EDIT USER */}

        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute>

              <EditUser />

            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;