import {
  getAllTai_Khoan,
  getTai_Khoan,
  createTai_Khoan,
  updateTai_Khoan,
  deleteTai_Khoan,
  postTai_Khoan_User_Pass,
  getAllNha_Si,
} from "../Models/Tai_Khoan_Model.js";
import bcrypt from "bcrypt"; // Thêm bcrypt để mã hóa mật khẩu

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

const getTai_KhoanController = async (req, res) => {
  try {
    const { id } = req.params;
    const Tai_Khoan = await getTai_Khoan(id);
    if (Tai_Khoan) {
      res.json(Tai_Khoan);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postTai_Khoan_User_PassController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN, MAT_KHAU } = req.body;

    // Kiểm tra xem cả hai trường đều có giá trị hay không
    if (!TEN_TAI_KHOAN || !MAT_KHAU) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const Tai_Khoan = await postTai_Khoan_User_Pass(TEN_TAI_KHOAN, MAT_KHAU);

    // Kiểm tra xem tài khoản có tồn tại và mật khẩu có chính xác hay không
    if (Tai_Khoan && Tai_Khoan.length > 0) {
      res.status(200).json({ message: "Đăng nhập thành công" });
    } else {
      res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu không chính xác" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTai_Khoan_UserController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN } = req.params;
    if (TEN_TAI_KHOAN !== null) {
      const Tai_Khoan = await getTai_Khoan_User(TEN_TAI_KHOAN);
      res.json(req.params);
    } else {
      res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTai_KhoanController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN, TEN_NHAN_VIEN, CCCD, SDT, MAT_KHAU, CHUC_VU_ID } =
      req.body;

    // Kiểm tra xem tất cả các trường đều có giá trị hay không
    if (
      !TEN_TAI_KHOAN ||
      !TEN_NHAN_VIEN ||
      !CCCD ||
      !SDT ||
      !MAT_KHAU ||
      !CHUC_VU_ID
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    // Mã hóa mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(MAT_KHAU, 10);

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
    const { TEN_TAI_KHOAN, TEN_NHAN_VIEN, CCCD, SDT, MAT_KHAU, CHUC_VU_ID } =
      req.body;

    // Kiểm tra xem tất cả các trường đều có giá trị hay không
    if (!TEN_TAI_KHOAN || !TEN_NHAN_VIEN || !CCCD || !SDT || !CHUC_VU_ID) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const updatedTai_Khoan = await updateTai_Khoan(
      id,
      TEN_TAI_KHOAN,
      TEN_NHAN_VIEN,
      CCCD,
      SDT,
      CHUC_VU_ID
    );
    if (updatedTai_Khoan) {
      res.json(updatedTai_Khoan);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTai_KhoanController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTai_Khoan(id);
    if (result && result.affectedRows > 0) {
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
  postTai_Khoan_User_PassController,
  GetAllNha_SiController,
};
