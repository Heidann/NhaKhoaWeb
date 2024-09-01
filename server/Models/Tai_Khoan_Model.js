import pool from "../Config/database.js";

const getAllTai_Khoan = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllTaiKhoan()");
  return rows[0];
};
const getAllNha_Si = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllNhaSi()");
  return rows[0];
};

const getTai_Khoan = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetTaiKhoan(?)", [AUTO_ID]);
  return rows[0];
};

const getTai_KhoanById = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetTaiKhoanById(?)", [AUTO_ID]);
  return rows[0];
};

const postTaiKhoanByUser = async (TEN_TAI_KHOAN) => {
  const [rows] = await pool.execute("CALL sp_GetTaiKhoanByUser(?)", [
    TEN_TAI_KHOAN,
  ]);
  return rows[0];
};

const createTai_Khoan = async (
  TEN_TAI_KHOAN,
  TEN_NHAN_VIEN,
  CCCD,
  SDT,
  MAT_KHAU,
  CHUC_VU_ID
) => {
  const [result] = await pool.execute(
    "CALL sp_InsertTaiKhoan(?, ?, ?, ?, ?, ?)",
    [TEN_TAI_KHOAN, TEN_NHAN_VIEN, CCCD, SDT, MAT_KHAU, CHUC_VU_ID]
  );
  return result[0];
};

const updateTai_Khoan = async (
  id,
  TEN_TAI_KHOAN,
  TEN_NHAN_VIEN,
  CCCD,
  SDT,
  CHUC_VU_ID
) => {
  const [result] = await pool.execute(
    "CALL sp_UpdateTaiKhoan(?,?, ?, ?, ?, ?)",
    [id, TEN_TAI_KHOAN, TEN_NHAN_VIEN, CCCD, SDT, CHUC_VU_ID]
  );
  return result[0];
};
const updateMatKhau = async (id, MAT_KHAU) => {
  const [result] = await pool.execute("CALL sp_UpdateMatKhau(?,?)", [
    id,
    MAT_KHAU,
  ]);
  return result[0];
};

const deleteTai_Khoan = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteTaiKhoan(?)", [AUTO_ID]);
  return result[0];
};

export {
  getAllTai_Khoan,
  getTai_Khoan,
  createTai_Khoan,
  updateTai_Khoan,
  deleteTai_Khoan,
  postTaiKhoanByUser,
  getAllNha_Si,
  getTai_KhoanById,
  updateMatKhau,
};
