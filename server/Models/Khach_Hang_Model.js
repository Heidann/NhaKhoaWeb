import pool from "../Config/database.js";

const getAllKhach_Hang = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllKhachHang()");
  return rows[0];
};

const getKhach_Hang = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetKhachHang(?)", [AUTO_ID]);
  return rows[0];
};
const getSDTKhachHang = async (SDT) => {
  const [rows] = await pool.execute("CALL sp_GetSDTKhachHang(?)", [SDT]);
  return rows[0];
};

const getKhach_Hang_By_TheBaoHanh = async (MA_THE_BAO_HANH) => {
  const [rows] = await pool.execute("CALL sp_GetKhachHang_By_TheBaoHanh(?)", [
    MA_THE_BAO_HANH,
  ]);
  return rows[0];
};

const createKhach_Hang = async (TEN_KHACH, THE_BAO_HANH_ID, CREATE_BY, SDT) => {
  const [result] = await pool.execute("CALL sp_InsertKhachHang( ?, ?, ?, ?)", [
    TEN_KHACH,
    THE_BAO_HANH_ID,
    CREATE_BY,
    SDT,
  ]);
  return result[0];
};

const updateKhach_Hang = async (
  AUTO_ID,
  TEN_KHACH,
  THE_BAO_HANH_ID,
  SDT,
  CREATE_BY
) => {
  const [result] = await pool.execute(
    "CALL sp_UpdateKhachHang(?, ?, ?, ?, ?)",
    [AUTO_ID, TEN_KHACH, THE_BAO_HANH_ID, SDT, CREATE_BY]
  );
  return result[0];
};

const deleteKhach_Hang = async (AUTO_ID, CREATE_BY) => {
  const [result] = await pool.execute("CALL sp_DeleteKhachHang(?,?)", [
    AUTO_ID,
    CREATE_BY,
  ]);
  return result[0];
};

export {
  getAllKhach_Hang,
  getKhach_Hang,
  createKhach_Hang,
  updateKhach_Hang,
  deleteKhach_Hang,
  getKhach_Hang_By_TheBaoHanh,
  getSDTKhachHang,
};
