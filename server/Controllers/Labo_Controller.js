import {
  getAllLabo,
  getLabo,
  createLabo,
  updateLabo,
  deleteLabo,
} from "../Models/Labo_Model.js";

const getAllLaboController = async (req, res) => {
  try {
    const Labo = await getAllLabo();
    res.json(Labo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLaboController = async (req, res) => {
  try {
    const { id } = req.params;
    const Labo = await getLabo(id);
    if (Labo) {
      res.json(Labo);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLaboController = async (req, res) => {
  try {
    const { TEN_LABO } = req.body;
    const newLabo = await createLabo(TEN_LABO);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLaboController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_LABO } = req.body;
    if (TEN_LABO !== null) {
      const updatedLabo = await updateLabo(id, TEN_LABO);
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLaboController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteLabo(id);
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
  getAllLaboController,
  getLaboController,
  createLaboController,
  updateLaboController,
  deleteLaboController,
};
