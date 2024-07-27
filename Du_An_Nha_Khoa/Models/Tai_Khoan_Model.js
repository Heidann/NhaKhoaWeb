import pool from '../Config/database.js';

const getAllTai_Khoan = async () => {
  const [rows] = await pool.execute('CALL sp_GetAllTaiKhoan()');
  return rows[0];
};

const getTai_Khoan = async (AUTO_ID) => {
  const [rows] = await pool.execute('CALL sp_GetTaiKhoan(?)', [AUTO_ID]);
  return rows[0][0];
};

const getTai_Khoan_User_Pass = async (TEN_TAI_KHOAN,MAT_KHAU) => {
  const [rows] = await pool.execute('CALL sp_GetTaiKhoan_User_Pass(?,?)', [TEN_TAI_KHOAN,MAT_KHAU]);
  return rows[0][0];
};

const getTai_Khoan_User = async (TEN_TAI_KHOAN) => {
  const [rows] = await pool.execute('CALL sp_GetTaiKhoan_User(?,?)', [TEN_TAI_KHOAN]);
  return rows[0][0];
};

const createTai_Khoan = async (TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID) => {
  const [result] = await pool.execute('CALL sp_InsertTaiKhoan(?, ?, ?, ?, ?)', [TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID]);
  return result[0][0];
};

const updateTai_Khoan = async (AUTO_ID, TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID) => {
  const [result] = await pool.execute('CALL sp_UpdateTaiKhoan(?, ?, ?, ?, ?, ?)', [AUTO_ID, TEN_TAI_KHOAN, TEN_NHAN_VIEN, SDT, MAT_KHAU, CHUC_VU_ID]);
  return result[0][0];
};

const deleteTai_Khoan = async (AUTO_ID) => {
  const [result] = await pool.execute('CALL sp_DeleteTaiKhoan(?)', [AUTO_ID]);
  return result[0][0];
};

export {
  getAllTai_Khoan,
  getTai_Khoan,
  createTai_Khoan,
  updateTai_Khoan,
  deleteTai_Khoan,
  getTai_Khoan_User_Pass,
  getTai_Khoan_User
};