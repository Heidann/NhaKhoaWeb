import pool from "../Config/database.js";

const getAllVat_Lieu = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllVatLieu()");
  return rows[0];
};

const getVat_Lieu = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetVatLieu(?)", [AUTO_ID]);
  return rows[0];
};

const createVat_Lieu = async (TEN_VAT_LIEU) => {
  const [result] = await pool.execute("CALL sp_InsertVatLieu(?)", [
    TEN_VAT_LIEU,
  ]);
  return result[0];
};

const updateVat_Lieu = async (AUTO_ID, TEN_VAT_LIEU) => {
  const [result] = await pool.execute("CALL sp_UpdateVatLieu(?, ?)", [
    AUTO_ID,
    TEN_VAT_LIEU,
  ]);
  return result[0];
};

const deleteVat_Lieu = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteVatLieu(?)", [AUTO_ID]);
  return result[0];
};

export {
  getAllVat_Lieu,
  getVat_Lieu,
  createVat_Lieu,
  updateVat_Lieu,
  deleteVat_Lieu,
};
