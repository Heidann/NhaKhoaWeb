import { getAllChuc_Vu, getChuc_Vu, createChuc_Vu, updateChuc_Vu, deleteChuc_Vu } from '../Models/Chuc_Vu_Model.js';

const getAllChuc_VuController = async (req, res) => {
  try {
    const Chuc_Vu = await getAllChuc_Vu();
    res.json(Chuc_Vu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChuc_VuController = async (req, res) => {
  try {
    const { id } = req.params;
    const Chuc_Vu = await getChuc_Vu(id);
    if (Chuc_Vu) {
      res.json(Chuc_Vu);
    } else {
      res.status(404).json({ message: 'Không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createChuc_VuController = async (req, res) => {
  try {
    const { MA_CHUC_VU, TEN_CHUC_VU } = req.body;
    const newChuc_Vu = await createChuc_Vu(MA_CHUC_VU, TEN_CHUC_VU);
    res.status(201).json(newChuc_Vu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChuc_VuController = async (req, res) => {
  try {
    const { id } = req.params;
    const { MA_CHUC_VU, TEN_CHUC_VU } = req.body;
    const updatedChuc_Vu = await updateChuc_Vu(id, MA_CHUC_VU, TEN_CHUC_VU);
    if (updatedChuc_Vu) {
      res.json(updatedChuc_Vu);
    } else {
      res.status(404).json({ message: 'Cập nhật không thành công' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChuc_VuController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteChuc_Vu(id);
    if (result && result.affectedRows > 0) {
      res.json({ message: 'Xóa thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy hoặc xóa không thành công' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllChuc_VuController,
  getChuc_VuController,
  createChuc_VuController,
  updateChuc_VuController,
  deleteChuc_VuController
};