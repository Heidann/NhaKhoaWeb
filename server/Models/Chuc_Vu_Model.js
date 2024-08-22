import pool from "../Config/database.js";

export const getAllChuc_Vu = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllChucVu()");
  return rows[0];
};

export const getChuc_Vu = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetChucVu(?)", [AUTO_ID]);
  return rows[0];
};

export const createChuc_Vu = async (TEN_CHUC_VU) => {
  const [result] = await pool.execute("CALL sp_InsertChucVu(?)", [TEN_CHUC_VU]);
  return result[0];
};

export const updateChuc_Vu = async (AUTO_ID, MA_CHUC_VU, TEN_CHUC_VU) => {
  const [result] = await pool.execute("CALL sp_UpdateChucVu(?, ?, ?)", [
    AUTO_ID,
    MA_CHUC_VU,
    TEN_CHUC_VU,
  ]);
  return result[0];
};

export const deleteChuc_Vu = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteChucVu(?)", [AUTO_ID]);
  return result[0];
};
