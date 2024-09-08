import { Outlet } from "react-router-dom";
import PrivateRoute from "../handle/CheckAuth.jsx";

const ProtectedRoutes = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

export { ProtectedRoutes };
