import { getAllKhach_Hang, getKhach_Hang, createKhach_Hang, updateKhach_Hang, deleteKhach_Hang, getKhach_Hang_By_TheBaoHanh } from '../Models/Khach_Hang_Model.js';

const getAllKhach_HangController = async (req, res) => {
  try {
    const Khach_Hang = await getAllKhach_Hang();
    res.json(Khach_Hang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKhach_HangController = async (req, res) => {
  try {
    const { id } = req.params;
    const Khach_Hang = await getKhach_Hang(id);
    if (Khach_Hang) {
      res.json(Khach_Hang);
    } else {
      res.status(404).json({ message: 'Không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKhach_Hang_By_TheBaoHanhController = async (req, res) => {
  try {
    const { THE_BAO_HANH_ID } = req.params;
    const Khach_Hang = await getKhach_Hang_By_TheBaoHanh(THE_BAO_HANH_ID);
    if (Khach_Hang) {
      res.json(Khach_Hang);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin thẻ bảo hành' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createKhach_HangController = async (req, res) => {
  try {
    const { MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID } = req.body;
    const newKhach_Hang = await createKhach_Hang(MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID);
    res.status(201).json(newKhach_Hang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateKhach_HangController = async (req, res) => {
  try {
    const { id } = req.params;
    const { MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID } = req.body;
    const updatedKhach_Hang = await updateKhach_Hang(id, MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID);
    if (updatedKhach_Hang) {
      res.json(updatedKhach_Hang);
    } else {
      res.status(404).json({ message: 'Cập nhật không thành công' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteKhach_HangController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteKhach_Hang(id);
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
  getAllKhach_HangController,
  getKhach_HangController,
  createKhach_HangController,
  updateKhach_HangController,
  deleteKhach_HangController,
  getKhach_Hang_By_TheBaoHanhController
};