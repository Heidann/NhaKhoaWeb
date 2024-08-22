import {
  getAllVat_Lieu,
  getVat_Lieu,
  createVat_Lieu,
  updateVat_Lieu,
  deleteVat_Lieu,
} from "../Models/Vat_Lieu_Model.js";

const getAllVat_LieuController = async (req, res) => {
  try {
    const Vat_Lieu = await getAllVat_Lieu();
    res.json(Vat_Lieu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVat_LieuController = async (req, res) => {
  try {
    const { id } = req.params;
    const Vat_Lieu = await getVat_Lieu(id);
    if (Vat_Lieu) {
      res.json(Vat_Lieu);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVat_LieuController = async (req, res) => {
  try {
    const { TEN_VAT_LIEU } = req.body;
    const newThe_Bao_Hanh = await createVat_Lieu(TEN_VAT_LIEU);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVat_LieuController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_VAT_LIEU } = req.body;
    if (TEN_VAT_LIEU !== null) {
      const updatedThe_Bao_Hanh = await updateVat_Lieu(id, TEN_VAT_LIEU);
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVat_LieuController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteVat_Lieu(id);
    if (result !== null) {
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
  getAllVat_LieuController,
  getVat_LieuController,
  createVat_LieuController,
  updateVat_LieuController,
  deleteVat_LieuController,
};
