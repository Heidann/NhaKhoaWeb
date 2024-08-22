import pool from "../Config/database.js";

const getAllLoai_Dia = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllLoaiDia()");
  return rows[0];
};

const getLoai_Dia = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetLoaiDia(?)", [AUTO_ID]);
  return rows[0];
};

const createLoai_Dia = async (TEN_LOAI_DIA) => {
  const [result] = await pool.execute("CALL sp_InsertLoaiDia(?)", [
    TEN_LOAI_DIA,
  ]);
  return result[0];
};

const updateLoai_Dia = async (AUTO_ID, TEN_LOAI_DIA) => {
  const [result] = await pool.execute("CALL sp_UpdateLoaiDia(?, ?)", [
    AUTO_ID,
    TEN_LOAI_DIA,
  ]);
  return result[0];
};

const deleteLoai_Dia = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteLoaiDia(?)", [AUTO_ID]);
  return result[0];
};

export {
  getAllLoai_Dia,
  getLoai_Dia,
  createLoai_Dia,
  updateLoai_Dia,
  deleteLoai_Dia,
};
