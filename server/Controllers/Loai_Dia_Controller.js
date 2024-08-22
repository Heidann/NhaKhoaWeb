import {
  getAllLoai_Dia,
  getLoai_Dia,
  createLoai_Dia,
  updateLoai_Dia,
  deleteLoai_Dia,
} from "../Models/Loai_Dia_Model.js";

const getAllLoai_DiaController = async (req, res) => {
  try {
    const Loai_Dia = await getAllLoai_Dia();
    res.status(200).json(Loai_Dia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoai_DiaController = async (req, res) => {
  try {
    const { id } = req.params;
    const Loai_Dia = await getLoai_Dia(id);
    if (Loai_Dia) {
      res.status(200).json(Loai_Dia);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLoai_DiaController = async (req, res) => {
  try {
    const { TEN_LOAI_DIA } = req.body;
    const newLoai_Dia = await createLoai_Dia(TEN_LOAI_DIA);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLoai_DiaController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_LOAI_DIA } = req.body;
    if (TEN_LOAI_DIA !== null) {
      const updatedLoai_Dia = await updateLoai_Dia(id, TEN_LOAI_DIA);
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLoai_DiaController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteLoai_Dia(id);
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
  getAllLoai_DiaController,
  getLoai_DiaController,
  createLoai_DiaController,
  updateLoai_DiaController,
  deleteLoai_DiaController,
};
