import pool from "../Config/database.js";

const getAllHoa_Don = async () => {
  const [rows] = await pool.execute("CALL sp_GetAllHoaDon()");
  return rows[0];
};

const getHoa_Don = async (AUTO_ID) => {
  const [rows] = await pool.execute("CALL sp_GetHoaDon(?)", [AUTO_ID]);
  return rows[0];
};

const getHoa_Don_By_TheBaoHanh = async (MA_THE_BAO_HANH) => {
  const [rows] = await pool.execute("CALL sp_GetHoaDon_By_TheBaoHanh(?)", [
    MA_THE_BAO_HANH,
  ]);
  return rows[0];
};

const createHoa_Don = async (
  THE_BAO_HANH_ID,
  NHA_KHOA,
  TEN_BAC_SI,
  NGAY_KICH_HOAT,
  NGAY_HET_HAN,
  VAT_LIEU_ID,
  LABO_ID,
  LOAI_DIA_ID,
  SO_LUONG_RANG,
  VI_TRI_RANG,
  CREATE_BY,
  CREATE_AT
) => {
  const [result] = await pool.execute(
    "CALL sp_InsertHoaDon(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      THE_BAO_HANH_ID,
      NHA_KHOA,
      TEN_BAC_SI,
      NGAY_KICH_HOAT,
      NGAY_HET_HAN,
      VAT_LIEU_ID,
      LABO_ID,
      LOAI_DIA_ID,
      SO_LUONG_RANG,
      VI_TRI_RANG,
      CREATE_BY,
      CREATE_AT,
    ]
  );
  return result[0];
};

const deleteHoa_Don = async (AUTO_ID) => {
  const [result] = await pool.execute("CALL sp_DeleteHoaDon(?)", [AUTO_ID]);
  return result[0];
};

export {
  getAllHoa_Don,
  getHoa_Don,
  createHoa_Don,
  deleteHoa_Don,
  getHoa_Don_By_TheBaoHanh,
};
