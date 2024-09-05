import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutAdmin from "./components/Layout/LayoutAdmin.jsx";

// import KhachHang CRUD
import KhachHangPage from "./pages/KhachHangPage.jsx";
import KhAdd from "./components/KhachHangCRUD/KhAdd.jsx";
import KhDetail from "./components/KhachHangCRUD/KhDetail.jsx";
import KhUpdate from "./components/KhachHangCRUD/KhUpdate.jsx";

// import NhanVien CRUD
import NhanVienPage from "./pages/NhanVienPage.jsx";
import NvAdd from "./components/NhanVienCRUD/NvAdd.jsx";
import NvDetail from "./components/NhanVienCRUD/NvDetail.jsx";
import NvUpdate from "./components/NhanVienCRUD/NvUpdate.jsx";

// import TheBaoHanh CRUD
import TheBaoHanhPage from "./pages/TheBaoHanhPage";
import TbhAdd from "./components/TheBaoHanhCRUD/TbhAdd.jsx";
import TbhDetail from "./components/TheBaoHanhCRUD/TbhDetail.jsx";

// import Labo CRUD
import LaboPage from "./pages/LaboPage.jsx";
import LaboAdd from "./components/LaboCRUD/LaboAdd.jsx";
import LaboDetail from "./components/LaboCRUD/LaboDetail.jsx";
import LaboUpdate from "./components/LaboCRUD/LaboUpdate.jsx";

// import Xuat xu CRUD
import XuatXuPage from "./pages/XuatXuPage.jsx";
import XuatXuAdd from "./components/XuatXuCRUD/XuatXuAdd.jsx";
import XuatXuDetail from "./components/XuatXuCRUD/XuatXuDetail.jsx";
import XuatXuUpdate from "./components/XuatXuCRUD/XuatXuUpdate.jsx";

// import Labo CRUD
import VatLieuPage from "./pages/VatLieuPage.jsx";
import VatLieuAdd from "./components/VatLieuCRUD/VatLieuAdd.jsx";
import VatLieuDetail from "./components/VatLieuCRUD/VatLieuDetail.jsx";
import VatLieuUpdate from "./components/VatLieuCRUD/VatLieuUpdate.jsx";

// import NhatKy CRUD
import NhatKyPage from "./pages/NhatKyPage.jsx";
import NhatKyAdd from "./components/NhatKyCRD//NkAdd.jsx";
import NhatKyDetail from "./components/NhatKyCRD/NkDetail.jsx";

// import ChucVu CRUD
import ChucVuPage from "./pages/ChucVuPage.jsx";
import CvAdd from "./components/ChucVuCRUD/CvAdd.jsx";
import CvDetail from "./components/ChucVuCRUD/CvDetail.jsx";
import CvUpdate from "./components/ChucVuCRUD/CvUpdate.jsx";

import ThongKePage from "./pages/ThongKe.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<SignInPage />} />

          {/* Đăng nhập */}

          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />} />
            {/* Khach hang */}
            <Route path="/khach-hang/:id/chi-tiet" element={<KhDetail />} />
            <Route path="/khach-hang/:id/chinh-sua" element={<KhUpdate />} />
            <Route path="/khach-hang/them" element={<KhAdd />} />
            <Route path="/khach-hang" element={<KhachHangPage />} />
            {/* Nhan vien */}
            <Route path="/nhan-vien/:id/chi-tiet" element={<NvDetail />} />
            <Route path="/nhan-vien/:id/chinh-sua" element={<NvUpdate />} />
            <Route path="/nhan-vien/them" element={<NvAdd />} />
            <Route path="/nhan-vien" element={<NhanVienPage />} />
            {/* The bao hanh */}
            <Route path="/the-bao-hanh/:id/chi-tiet" element={<TbhDetail />} />
            <Route path="/the-bao-hanh/them" element={<TbhAdd />} />
            <Route path="/the-bao-hanh" element={<TheBaoHanhPage />} />
            {/* Chuc vu */}
            <Route path="/chuc-vu/:id/chi-tiet" element={<CvDetail />} />
            <Route path="/chuc-vu/:id/chinh-sua" element={<CvUpdate />} />
            <Route path="/chuc-vu/them" element={<CvAdd />} />
            <Route path="/chuc-vu" element={<ChucVuPage />} />
            {/* Labo */}
            <Route path="/labo/:id/chi-tiet" element={<LaboDetail />} />
            <Route path="/labo/:id/chinh-sua" element={<LaboUpdate />} />
            <Route path="/labo/them" element={<LaboAdd />} />
            <Route path="/labo" element={<LaboPage />} />
            {/* Xuat Xu */}
            <Route path="/xuat-xu/:id/chi-tiet" element={<XuatXuDetail />} />
            <Route path="/xuat-xu/:id/chinh-sua" element={<XuatXuUpdate />} />
            <Route path="/xuat-xu/them" element={<XuatXuAdd />} />
            <Route path="/xuat-xu" element={<XuatXuPage />} />
            {/* Vat lieu */}
            <Route path="/vat-lieu" element={<VatLieuPage />} />
            <Route path="/vat-lieu/:id/chi-tiet" element={<VatLieuDetail />} />
            <Route path="/vat-lieu/them" element={<VatLieuAdd />} />
            <Route path="/vat-lieu/:id/chinh-sua" element={<VatLieuUpdate />} />
            {/* nhat ky */}
            <Route path="/nhat-ky/:id/chi-tiet" element={<NhatKyDetail />} />
            <Route path="/nhat-ky/them" element={<NhatKyAdd />} />
            <Route path="/nhat-ky" element={<NhatKyPage />} />
            {/* thong ke */}
            <Route path="/thong-ke" element={<ThongKePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
