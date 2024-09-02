import {
  getAllThe_Bao_Hanh,
  getThe_Bao_Hanh,
  createThe_Bao_Hanh,
  updateThe_Bao_Hanh,
  deleteThe_Bao_Hanh,
  GetStatusTheBaoHanhID_By_Ma,
  GetTheBaoHanhID_By_Ma,
  getSo_Luong,
} from "../Models/The_Bao_Hanh_Model.js";

const getAllThe_Bao_HanhController = async (req, res) => {
  try {
    const The_Bao_Hanh = await getAllThe_Bao_Hanh();
    res.json(The_Bao_Hanh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getThe_Bao_HanhController = async (req, res) => {
  try {
    const { id } = req.params;
    const The_Bao_Hanh = await getThe_Bao_Hanh(id);
    if (The_Bao_Hanh) {
      res.json(The_Bao_Hanh);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatusTheBaoHanhID_By_MaController = async (req, res) => {
  try {
    const { maTheBaoHanh } = req.params;
    const The_Bao_Hanh = await GetStatusTheBaoHanhID_By_Ma(maTheBaoHanh);
    if (The_Bao_Hanh) {
      res.json(The_Bao_Hanh);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTheBaoHanhID_By_MaController = async (req, res) => {
  try {
    const { maTheBaoHanh } = req.params;
    const The_Bao_Hanh = await GetTheBaoHanhID_By_Ma(maTheBaoHanh);
    if (The_Bao_Hanh) {
      res.json(The_Bao_Hanh);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createThe_Bao_HanhController = async (req, res) => {
  try {
    const { SO_LUONG_THE_BAO_HANH } = req.body;
    const newThe_Bao_Hanh = await createThe_Bao_Hanh(SO_LUONG_THE_BAO_HANH);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateThe_Bao_HanhController = async (req, res) => {
  try {
    const { id } = req.params;
    const { MA_THE_BAO_HANH } = req.body;
    if (MA_THE_BAO_HANH !== null) {
      const updatedThe_Bao_Hanh = await updateThe_Bao_Hanh(id, MA_THE_BAO_HANH);
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: "Cập nhật không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteThe_Bao_HanhController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteThe_Bao_Hanh(id);
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
const getSo_LuongController = async (req, res) => {
  try {
    const Count = await getSo_Luong();
    res.json(Count);
    console.log(Count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllThe_Bao_HanhController,
  getThe_Bao_HanhController,
  createThe_Bao_HanhController,
  updateThe_Bao_HanhController,
  deleteThe_Bao_HanhController,
  getStatusTheBaoHanhID_By_MaController,
  getTheBaoHanhID_By_MaController,
  getSo_LuongController,
};
