import {
  getAllTai_Khoan,
  getTai_Khoan,
  createTai_Khoan,
  updateTai_Khoan,
  deleteTai_Khoan,
  postTaiKhoanByUser,
  getAllNha_Si,
  getTai_KhoanById,
  updateMatKhau,
} from "../Models/Tai_Khoan_Model.js";
import bcrypt from "bcrypt"; // Thêm bcrypt để mã hóa mật khẩu
import { generateToken } from "../middlewares/Auth.js";
import asyncHandler from "express-async-handler";

const getAllTai_KhoanController = async (req, res) => {
  try {
    const Tai_Khoan = await getAllTai_Khoan();
    res.json(Tai_Khoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAllNha_SiController = async (req, res) => {
  try {
    const Nha_Si = await getAllNha_Si();
    res.json(Nha_Si);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTai_KhoanController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Tai_Khoan = await getTai_Khoan(id);
  if (Tai_Khoan) {
    res.json(Tai_Khoan);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

const getTai_KhoanByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Tai_Khoan = await getTai_KhoanById(id);
  if (Tai_Khoan) {
    res.json(Tai_Khoan);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

// login user
const postTaiKhoanByUserController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN, MAT_KHAU } = req.body;

    // Kiểm tra xem cả hai trường đều có giá trị hay không
    if (TEN_TAI_KHOAN == null) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const user = await postTaiKhoanByUser(TEN_TAI_KHOAN);
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    // So sánh mật khẩu
    const isPasswordMatch = await bcrypt.compare(MAT_KHAU, user[0].MAT_KHAU);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Tạo JWT
    const token = generateToken(user[0].AUTO_ID);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTai_Khoan_UserController = asyncHandler(async (req, res) => {
  const { TEN_TAI_KHOAN } = req.params;
  if (TEN_TAI_KHOAN !== null) {
    const Tai_Khoan = await getTai_Khoan_User(TEN_TAI_KHOAN);
    res.json(req.params);
  } else {
    res.status(404).json({ message: "Tài khoản không tồn tại" });
  }
});

const createTai_KhoanController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN, TEN_NHAN_VIEN, CCCD, SDT, CHUC_VU_ID } = req.body;

    // Kiểm tra xem tất cả các trường đều có giá trị hay không
    if (!TEN_TAI_KHOAN || !TEN_NHAN_VIEN || !CCCD || !SDT || !CHUC_VU_ID) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    // Mã hóa mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash("123", 10);

    const newTai_Khoan = await createTai_Khoan(
      TEN_TAI_KHOAN,
      TEN_NHAN_VIEN,
      CCCD,
      SDT,
      hashedPassword, // Lưu mật khẩu đã mã hóa
      CHUC_VU_ID
    );
    res.status(201).json({ message: "Tạo tài khoản thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTai_KhoanController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_TAI_KHOAN, TEN_NHAN_VIEN, CCCD, SDT, CHUC_VU_ID } = req.body;
    // Kiểm tra xem tất cả các trường đều có giá trị hay không
    if (!TEN_TAI_KHOAN || !TEN_NHAN_VIEN || !CHUC_VU_ID) {
      return res.status(400).json({
        message:
          "Vui lòng nhập ít nhất thông tin Tên tài khoản, tên nhân viên và chức vụ!",
      });
    }
    const updatedTai_Khoan = await updateTai_Khoan(
      id,
      TEN_TAI_KHOAN,
      TEN_NHAN_VIEN,
      CCCD,
      SDT,
      CHUC_VU_ID
    );
    console.log(updatedTai_Khoan);
    res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMatKhauController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_TAI_KHOAN, MAT_KHAU_CU, MAT_KHAU_MOI } = req.body;

    // Kiểm tra xem tất cả các trường đều có giá trị hay không
    if (!TEN_TAI_KHOAN || (!MAT_KHAU_CU && !MAT_KHAU_MOI)) {
      return res.status(400).json({ message: "Vui lòng nhập thông tin" });
    }
    // Tìm tài khoản theo tên đăng nhập
    const user = await postTaiKhoanByUser(TEN_TAI_KHOAN);

    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // So sánh mật khẩu cũ
    const isPasswordMatch = await bcrypt.compare(MAT_KHAU_CU, user[0].MAT_KHAU);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Mật khẩu cũ không đúng" });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(MAT_KHAU_MOI, 10);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    await updateMatKhau(id, hashedPassword);

    res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

const deleteTai_KhoanController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTai_Khoan(id);
    if (result !== null && result !== false) {
      res.json({ message: "Xóa thành công" });
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy hoặc xóa không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllTai_KhoanController,
  getTai_KhoanController,
  createTai_KhoanController,
  updateTai_KhoanController,
  deleteTai_KhoanController,
  getTai_Khoan_UserController,
  postTaiKhoanByUserController,
  GetAllNha_SiController,
  getTai_KhoanByIdController,
  updateMatKhauController,
};
