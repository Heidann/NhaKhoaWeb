import {
  getAllHoa_Don,
  getHoa_Don,
  createHoa_Don,
  deleteHoa_Don,
  getHoa_Don_By_TheBaoHanh,
} from "../Models/Hoa_Don_Model.js";

const getAllHoa_DonController = async (req, res) => {
  try {
    const Hoa_Don = await getAllHoa_Don();
    res.json(Hoa_Don);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHoa_DonController = async (req, res) => {
  try {
    const { id } = req.params;
    const Hoa_Don = await getHoa_Don(id);
    if (Hoa_Don) {
      res.json(Hoa_Don);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHoa_Don_By_TheBaoHanhController = async (req, res) => {
  try {
    const { maHoaDon } = req.params; // Lấy từ req.params
    if (!maHoaDon) {
      return res.status(400).json({ message: "Missing 'maHoaDon' parameter" });
    }
    const Hoa_Don = await getHoa_Don_By_TheBaoHanh(maHoaDon);
    if (Hoa_Don) {
      res.json(Hoa_Don);
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy thông tin thẻ bảo hành" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHoa_DonController = async (req, res) => {
  try {
    const {
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
    } = req.body;
    const newHoa_Don = await createHoa_Don(
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
    );
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHoa_DonController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    if (
      THE_BAO_HANH_ID !== null ||
      NHA_KHOA !== null ||
      TEN_BAC_SI !== null ||
      NGAY_KICH_HOAT !== null ||
      NGAY_HET_HAN !== null ||
      VAT_LIEU_ID !== null ||
      LABO_ID !== null ||
      LOAI_DIA_ID !== null ||
      SO_LUONG_RANG !== null ||
      VI_TRI_RANG !== null ||
      CREATE_BY !== null ||
      CREATE_AT !== null
    ) {
      const updatedHoa_Don = await updateHoa_Don(
        id,
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
      );
      res.json(updatedHoa_Don);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHoa_DonController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteHoa_Don(id);
    if (result && result.affectedRows > 0) {
      res.json({ message: "Xóa thành công" });
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy hoặc xóa không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllHoa_DonController,
  getHoa_DonController,
  createHoa_DonController,
  updateHoa_DonController,
  deleteHoa_DonController,
  getHoa_Don_By_TheBaoHanhController,
};
