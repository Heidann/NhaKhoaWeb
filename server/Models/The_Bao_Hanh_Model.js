import pool from "../Config/database.js";

const getAllThe_Bao_Hanh = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllTheBaoHanh()");
  return rows[0];
};

const getThe_Bao_Hanh = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetTheBaoHanh(?)", [AUTO_ID]);
  return rows[0];
};
const GetTheBaoHanhID_By_Ma = async (MA_THE_BAO_HANH) => {
  const [rows] = await pool.execute("CALL sp_GetTheBaoHanhID_By_Ma(?)", [
    MA_THE_BAO_HANH,
  ]);
  return rows[0];
};

const createThe_Bao_Hanh = async (SO_LUONG_THE_BAO_HANH) => {
  const [result] = await pool.execute("CALL sp_InsertTheBaoHanh(?)", [
    SO_LUONG_THE_BAO_HANH,
  ]);
  return result[0];
};

const updateThe_Bao_Hanh = async (AUTO_ID, MA_THE_BAO_HANH) => {
  const [result] = await pool.execute("CALL sp_UpdateTheBaoHanh(?, ?)", [
    AUTO_ID,
    MA_THE_BAO_HANH,
  ]);
  return result[0];
};

const deleteThe_Bao_Hanh = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteTheBaoHanh(?)", [AUTO_ID]);
  return result[0];
};
// get sum the bao hanh
const getSo_Luong = async () => {
  const [rows] = await pool.execute("CALL DemSoLuongTheBaoHanh()");
  return rows[0].SoLuongTheBaoHanh;
};

export {
  getAllThe_Bao_Hanh,
  getThe_Bao_Hanh,
  GetTheBaoHanhID_By_Ma,
  createThe_Bao_Hanh,
  updateThe_Bao_Hanh,
  deleteThe_Bao_Hanh,
  getSo_Luong,
};
