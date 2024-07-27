import { getAllTai_Khoan, getTai_Khoan, createTai_Khoan, updateTai_Khoan, deleteTai_Khoan,  getTai_Khoan_User_Pass, getTai_Khoan_User } from '../Models/Tai_Khoan_Model.js';

const getAllTai_KhoanController = async (req, res) => {
  try {
    const Tai_Khoan = await getAllTai_Khoan();
    res.json(Tai_Khoan);
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
      res.status(404).json({ message: 'Không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTai_Khoan_User_PassController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN, MAT_KHAU } = req.params;
    const Tai_Khoan = await getTai_Khoan_User_Pass(TEN_TAI_KHOAN, MAT_KHAU);
    if (Tai_Khoan) {
      res.json(Tai_Khoan);
    } else {
      res.status(404).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTai_Khoan_UserController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN} = req.params;
    const Tai_Khoan = await getTai_Khoan_User_Pass(TEN_TAI_KHOAN);
    if (Tai_Khoan) {
      res.json(Tai_Khoan);
    } else {
      res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTai_KhoanController = async (req, res) => {
  try {
    const { TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID } = req.body;
    const newTai_Khoan = await createTai_Khoan(TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID);
    res.status(201).json(newTai_Khoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTai_KhoanController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID } = req.body;
    const updatedTai_Khoan = await updateTai_Khoan(id, TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID);
    if (updatedTai_Khoan) {
      res.json(updatedTai_Khoan);
    } else {
      res.status(404).json({ message: 'Cập nhật không thành công' });
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
      res.json({ message: 'Xóa thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy hoặc xóa không thành công' });
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
  getTai_Khoan_User_PassController,
  getTai_Khoan_UserController
};