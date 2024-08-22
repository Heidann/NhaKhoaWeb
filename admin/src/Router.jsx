import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutAdmin from "./components/Layout/LayoutAdmin.jsx";

// import KhachHang CRUD
import KhachHangPage from "./pages/KhachHangPage.jsx";
import KhAdd from "./components/KhachHangCRUD/KhAdd.jsx";
import KhDetail from "./components/KhachHangCRUD/KhDetail.jsx";
import KhUpdate from "./components/KhachHangCRUD/KhUpdate.jsx";
import KhDelete from "./components/KhachHangCRUD/KhDelete.jsx";

// import NhanVien CRUD
import NhanVienPage from "./pages/NhanVienPage.jsx";
import NvAdd from "./components/NhanVienCRUD/NvAdd.jsx";
import NvDetail from "./components/NhanVienCRUD/NvDetail.jsx";
import NvUpdate from "./components/NhanVienCRUD/NvUpdate.jsx";
import NvDelete from "./components/NhanVienCRUD/NvDelete.jsx";

// import TheBaoHanh CRUD
import TheBaoHanhPage from "./pages/TheBaoHanhPage";
import TbhAdd from "./components/TheBaoHanhCRUD/TbhAdd.jsx";
import TbhDetail from "./components/TheBaoHanhCRUD/TbhDetail.jsx";
import TbhDelete from "./components/TheBaoHanhCRUD/TbhDelete.jsx";

// import Labo CRUD
import LaboPage from "./pages/LaboPage.jsx";
import LaboAdd from "./components/LaboCRUD/LaboAdd.jsx";
import LaboDetail from "./components/LaboCRUD/LaboDetail.jsx";
import LaboUpdate from "./components/LaboCRUD/LaboUpdate.jsx";

// import Labo CRUD
import LoaiDiaPage from "./pages/LoaiDiaPage.jsx";
import LdAdd from "./components/LoaiDiaCRUD/LoaiDiaAdd.jsx";
import LdDetail from "./components/LoaiDiaCRUD/LoaiDiaDetail.jsx";
import LdUpdate from "./components/LoaiDiaCRUD/LoaiDiaUpdate.jsx";

// import Labo CRUD
import VatLieuPage from "./pages/VatLieuPage.jsx";
// import LaboAdd from "./components/TheBaoHanhCRUD/TbhAdd.jsx";
// import LaboDetail from "./components/TheBaoHanhCRUD/TbhDetail.jsx";
// import LaboUpdate from "./components/TheBaoHanhCRUD/TbhUpdate.jsx";
// import LaboDelete from "./components/TheBaoHanhCRUD/TbhDelete.jsx";

// import Labo CRUD
import NhatKyPage from "./pages/NhatKyPage.jsx";
// import LaboAdd from "./components/TheBaoHanhCRUD/TbhAdd.jsx";
// import LaboDetail from "./components/TheBaoHanhCRUD/TbhDetail.jsx";
// import LaboUpdate from "./components/TheBaoHanhCRUD/TbhUpdate.jsx";
// import LaboDelete from "./components/TheBaoHanhCRUD/TbhDelete.jsx";

// import ChucVu CRUD
import ChucVuPage from "./pages/ChucVuPage.jsx";
import CvAdd from "./components/ChucVuCRUD/CvAdd.jsx";
import CvDetail from "./components/ChucVuCRUD/CvDetail.jsx";
import CvUpdate from "./components/ChucVuCRUD/CvUpdate.jsx";
import CvDelete from "./components/ChucVuCRUD/CvDelete.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dang-nhap" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />} />
            {/* Khach hang */}
            <Route path="/khach-hang/:id/chi-tiet" element={<KhDetail />} />
            <Route path="/khach-hang/:id/chinh-sua" element={<KhUpdate />} />
            <Route path="/khach-hang/:id/xoa" element={<KhDelete />} />
            <Route path="/khach-hang/them" element={<KhAdd />} />
            <Route path="/khach-hang" element={<KhachHangPage />} />
            {/* Nhan vien */}
            <Route path="/nhan-vien/:id/chi-tiet" element={<NvDetail />} />
            <Route path="/nhan-vien/:id/chinh-sua" element={<NvUpdate />} />
            <Route path="/nhan-vien/:id/xoa" element={<NvDelete />} />
            <Route path="/nhan-vien/them" element={<NvAdd />} />
            <Route path="/nhan-vien" element={<NhanVienPage />} />
            {/* The bao hanh */}
            <Route path="/the-bao-hanh/:id/chi-tiet" element={<TbhDetail />} />
            <Route path="/the-bao-hanh/:id/xoa" element={<TbhDelete />} />
            <Route path="/the-bao-hanh/them" element={<TbhAdd />} />
            <Route path="/the-bao-hanh" element={<TheBaoHanhPage />} />
            {/* Chuc vu */}
            <Route path="/chuc-vu/:id/chi-tiet" element={<CvDetail />} />
            <Route path="/chuc-vu/:id/chinh-sua" element={<CvUpdate />} />
            <Route path="/chuc-vu/:id/xoa" element={<CvDelete />} />
            <Route path="/chuc-vu/them" element={<CvAdd />} />
            <Route path="/chuc-vu" element={<ChucVuPage />} />
            {/* Labo */}
            <Route path="/labo/:id/chi-tiet" element={<LaboDetail />} />
            <Route path="/labo/:id/chinh-sua" element={<LaboUpdate />} />
            <Route path="/labo/them" element={<LaboAdd />} />
            <Route path="/labo" element={<LaboPage />} />
            {/* Loai dia */}
            <Route path="/loai-dia/:id/chi-tiet" element={<LdDetail />} />
            <Route path="/loai-dia/:id/chinh-sua" element={<LdUpdate />} />
            <Route path="/loai-dia/them" element={<LdAdd />} />
            <Route path="/loai-dia" element={<LoaiDiaPage />} />
            {/* Vat lieu */}
            <Route path="/vat-lieu" element={<VatLieuPage />} />
            {/* <Route path="/chuc-vu/:id/chi-tiet" element={<CvDetail />} />
            <Route path="/chuc-vu/them" element={<CvAdd />} />
            <Route path="/chuc-vu/:id/chinh-sua" element={<CvUpdate />} />
            <Route path="/chuc-vu/:id/xoa" element={<CvDelete />} /> */}
            {/* nhat ky */}
            {/* <Route path="/chuc-vu/:id/chi-tiet" element={<CvDetail />} />
            <Route path="/chuc-vu/:id/chinh-sua" element={<CvUpdate />} />
            <Route path="/chuc-vu/:id/xoa" element={<CvDelete />} />
            <Route path="/chuc-vu/them" element={<CvAdd />} /> */}
            <Route path="/nhat-ky" element={<NhatKyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
