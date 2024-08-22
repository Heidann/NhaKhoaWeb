import pool from "../Config/database.js";

const getAllLabo = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllLabo()");
  return rows[0];
};

const getLabo = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetLabo(?)", [AUTO_ID]);
  return rows[0];
};

const createLabo = async (TEN_LABO) => {
  const [result] = await pool.execute("CALL sp_InsertLabo(?)", [TEN_LABO]);
  return result[0];
};

const updateLabo = async (AUTO_ID, TEN_LABO) => {
  const [result] = await pool.execute("CALL sp_UpdateLabo(?, ?)", [
    AUTO_ID,
    TEN_LABO,
  ]);
  return result[0];
};

const deleteLabo = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteLabo(?)", [AUTO_ID]);
  return result[0];
};

export { getAllLabo, getLabo, createLabo, updateLabo, deleteLabo };
