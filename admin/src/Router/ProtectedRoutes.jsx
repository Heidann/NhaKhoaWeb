import { Outlet } from "react-router-dom";
import { PrivateRoute } from "../handle/CheckAuth";

const ProtectedRoutes = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

export { ProtectedRoutes };
