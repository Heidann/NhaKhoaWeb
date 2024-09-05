import pool from "../Config/database.js";

const getAllXuat_Xu = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllXuatXu()");
  return rows[0];
};

const getXuat_Xu = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetXuatXu(?)", [AUTO_ID]);
  return rows[0];
};

const createXuat_Xu = async (TEN_XUAT_XU) => {
  const [result] = await pool.execute("CALL sp_InsertXuatXu(?)", [TEN_XUAT_XU]);
  return result[0];
};

const updateXuat_Xu = async (AUTO_ID, TEN_XUAT_XU) => {
  const [result] = await pool.execute("CALL sp_UpdateXuatXu(?, ?)", [
    AUTO_ID,
    TEN_XUAT_XU,
  ]);
  return result[0];
};

const deleteXuat_Xu = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteXuatXu(?)", [AUTO_ID]);
  return result[0];
};

export {
  getAllXuat_Xu,
  getXuat_Xu,
  createXuat_Xu,
  updateXuat_Xu,
  deleteXuat_Xu,
};
