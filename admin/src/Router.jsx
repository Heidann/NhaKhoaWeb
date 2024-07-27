import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TheBaoHanhPage from "./pages/TheBaoHanhPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import NhanVienPage from "./pages/NhanVienPage.jsx";

import LayoutAdmin from "./components/Layout/LayoutAdmin.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dang-nhap" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/bang-dieu-khien" element={<DashboardPage />} />
            <Route path="/khach-hang" element={<TheBaoHanhPage />} />
            <Route path="/nhan-vien" element={<NhanVienPage />} />
            <Route path="/the-bao-hanh" element={<TheBaoHanhPage />} />
            <Route path="/chuc-vu" element={<TheBaoHanhPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
