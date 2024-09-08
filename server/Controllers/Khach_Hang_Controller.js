import {
  getAllKhach_Hang,
  getKhach_Hang,
  createKhach_Hang,
  updateKhach_Hang,
  deleteKhach_Hang,
  getKhach_Hang_By_TheBaoHanh,
  getSDTKhachHang,
} from "../Models/Khach_Hang_Model.js";

const getAllKhach_HangController = async (req, res) => {
  try {
    const Khach_Hang = await getAllKhach_Hang();
    res.json(Khach_Hang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKhach_HangController = async (req, res) => {
  try {
    const { id } = req.params;
    const Khach_Hang = await getKhach_Hang(id);
    if (Khach_Hang) {
      res.json(Khach_Hang);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSDTKhachHangController = async (req, res) => {
  try {
    const { phone } = req.params;
    const Khach_Hang = await getSDTKhachHang(phone);
    if (Khach_Hang) {
      res.json(Khach_Hang);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getKhach_Hang_By_TheBaoHanhController = async (req, res) => {
  try {
    const { maTheBaoHanh } = req.params; // Lấy từ req.params
    if (!maTheBaoHanh) {
      return res
        .status(400)
        .json({ message: "Missing 'maTheBaoHanh' parameter" });
    }
    const Khach_Hang = await getKhach_Hang_By_TheBaoHanh(maTheBaoHanh);
    if (Khach_Hang) {
      res.json(Khach_Hang);
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy thông tin thẻ bảo hành" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createKhach_HangController = async (req, res) => {
  try {
    const { TEN_KHACH, THE_BAO_HANH_ID, SDT } = req.body;
    // lấy thông tin user trong phiên làm việc
    const CREATE_BY = req.user[0].AUTO_ID;
    const newKhach_Hang = await createKhach_Hang(
      TEN_KHACH,
      THE_BAO_HANH_ID,
      CREATE_BY,
      SDT || null
    );
    res.status(200).json({ message: "Thêm thành công!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateKhach_HangController = async (req, res) => {
  try {
    const { id } = req.params;
    const { TEN_KHACH, THE_BAO_HANH_ID, SDT } = req.body;
    // lấy thông tin user trong phiên làm việc
    const CREATE_BY = req.user[0].AUTO_ID;

    const updatedKhach_Hang = await updateKhach_Hang(
      id,
      TEN_KHACH,
      THE_BAO_HANH_ID,
      SDT,
      CREATE_BY
    );
    res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteKhach_HangController = async (req, res) => {
  try {
    const { id } = req.params;
    // lấy thông tin user trong phiên làm việc
    const CREATE_BY = req.user[0].AUTO_ID;
    const result = await deleteKhach_Hang(id, CREATE_BY);
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
  getAllKhach_HangController,
  getKhach_HangController,
  createKhach_HangController,
  updateKhach_HangController,
  deleteKhach_HangController,
  getKhach_Hang_By_TheBaoHanhController,
  getSDTKhachHangController,
};
