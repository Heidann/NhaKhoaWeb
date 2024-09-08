import {
  getAllXuat_Xu,
  getXuat_Xu,
  createXuat_Xu,
  updateXuat_Xu,
  deleteXuat_Xu,
} from "../Models/Xuat_Xu_Model.js";

const getAllXuat_XuController = async (req, res) => {
  try {
    const Xuat_Xu = await getAllXuat_Xu();
    res.status(200).json(Xuat_Xu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getXuat_XuController = async (req, res) => {
  try {
    const { id } = req.params;
    const Xuat_Xu = await getXuat_Xu(id);
    if (Xuat_Xu) {
      res.status(200).json(Xuat_Xu);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createXuat_XuController = async (req, res) => {
  try {
    const { TEN_XUAT_XU } = req.body;
    const newTEN_XUAT_XU = await createXuat_Xu(TEN_XUAT_XU);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateXuat_XuController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_XUAT_XU } = req.body;
    if (TEN_XUAT_XU !== null) {
      const updatedLoai_Dia = await updateXuat_Xu(id, TEN_XUAT_XU);
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteXuat_XuController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteXuat_Xu(id);
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
  getAllXuat_XuController,
  getXuat_XuController,
  createXuat_XuController,
  updateXuat_XuController,
  deleteXuat_XuController,
};
