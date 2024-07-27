import  pool  from '../Config/database.js';

const getAllThe_Bao_Hanh = async () => {
  const [rows] = await pool.execute('CALL sp_GetAllTheBaoHanh()');
  return rows[0];
};

const getThe_Bao_Hanh = async (AUTO_ID) => {
  const [rows] = await pool.execute('CALL sp_GetTheBaoHanh(?)', [AUTO_ID]);
  return rows[0][0];
};

const createThe_Bao_Hanh = async (MA_THE_BAO_HANH) => {
  const [result] = await pool.execute('CALL sp_InsertTheBaoHanh(?)', [MA_THE_BAO_HANH]);
  return result[0][0];
};

const updateThe_Bao_Hanh = async (AUTO_ID, MA_THE_BAO_HANH) => {
  const [result] = await pool.execute('CALL sp_UpdateTheBaoHanh(?, ?)', [AUTO_ID, MA_THE_BAO_HANH]);
  return result[0][0];
};

const deleteThe_Bao_Hanh = async (AUTO_ID) => {
  const [result] = await pool.execute('CALL sp_DeleteTheBaoHanh(?)', [AUTO_ID]);
  return result[0][0];
};

export {
  getAllThe_Bao_Hanh,
  getThe_Bao_Hanh,
  createThe_Bao_Hanh,
  updateThe_Bao_Hanh,
  deleteThe_Bao_Hanh
};