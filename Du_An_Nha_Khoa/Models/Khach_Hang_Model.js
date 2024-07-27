import pool from '../Config/database.js';

const getAllKhach_Hang = async () => {
  const [rows] = await pool.execute('CALL sp_GetAllKhachHang()');
  return rows[0];
};

const getKhach_Hang = async (AUTO_ID) => {
  const [rows] = await pool.execute('CALL sp_GetKhachHang(?)', [AUTO_ID]);
  return rows[0][0];
};

const getKhach_Hang_By_TheBaoHanh = async (TheBaoHanh_ID) => {
  const [rows] = await pool.execute('CALL sp_GetKhachHang_By_TheBaoHanh(?)', [TheBaoHanh_ID]);
  return rows[0][0];
};

const createKhach_Hang = async (MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID) => {
  const [result] = await pool.execute('CALL sp_InsertKhachHang(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID]);
  return result[0][0];
};

const updateKhach_Hang = async (AUTO_ID, MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID) => {
  const [result] = await pool.execute('CALL sp_UpdateKhachHang(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [AUTO_ID, MA_KHACH, TEN_KHACH, NHA_KHOA, TEN_BAC_SI, NGAY_KICH_HOAT, NGAY_HET_HAN, VAT_LIEU, LABO, LOAI_DIA, SO_LUONG_RANG, VI_TRI_RANG, THE_BAO_HANH_ID, TAI_KHOAN_ID]);
  return result[0][0];
};

const deleteKhach_Hang = async (AUTO_ID) => {
  const [result] = await pool.execute('CALL sp_DeleteKhachHang(?)', [AUTO_ID]);
  return result[0][0];
};

export {
  getAllKhach_Hang,
  getKhach_Hang,
  createKhach_Hang,
  updateKhach_Hang,
  deleteKhach_Hang,
  getKhach_Hang_By_TheBaoHanh
};