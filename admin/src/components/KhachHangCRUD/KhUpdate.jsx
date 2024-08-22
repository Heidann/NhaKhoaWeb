import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const KhUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bacSiOptions, setBacSiOptions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);

  // Fetch Bac Si options from your APIs
  const fetchBacSiOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/Tai_Khoan/nha_si"
      );
      const data = await response.json();
      setBacSiOptions(data);
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching Bac Si options:", error);
    }
  };

  useEffect(() => {
    fetchBacSiOptions();
  }, []);

  const [khachHang, setKhachHang] = useState({
    AUTO_ID: "",
    TEN_KHACH: "",
    TEN_NHA_KHOA: "",
    TEN_NHAN_VIEN: "",
    NGAY_KICH_HOAT: "",
    NGAY_HET_HAN: "",
    MA_THE_BAO_HANH: "",
    VAT_LIEU: "",
    LABO: "",
    LOAI_DIA: "",
    SO_LUONG_RANG: "",
    VI_TRI_RANG: "",
  });

  useEffect(() => {
    const fetchKhachHang = async () => {
      try {
        const response = await axios.get(`/api/khachhang/${id}`);
        setKhachHang(response.data);
        setSelectedMonth(
          Math.ceil(
            (new Date(response.data.NGAY_HET_HAN) -
              new Date(response.data.NGAY_KICH_HOAT)) /
              (1000 * 60 * 60 * 24 * 30)
          )
        );
      } catch (error) {
        console.error("Error fetching khách hàng:", error);
        toast.error("Lỗi khi lấy thông tin khách hàng");
      }
    };

    fetchKhachHang();
  }, [id]);

  const validationSchema = Yup.object().shape({
    tenKhach: Yup.string().required("Tên khách hàng là bắt buộc"),
    nhaKhoa: Yup.string().required("Nha khoa là bắt buộc"),
    tenBacSi: Yup.string().required("Tên bác sĩ là bắt buộc"),
    ngayKichHoat: Yup.date().required("Ngày kích hoạt là bắt buộc"),
    ngayHetHan: Yup.date().required("Ngày hết hạn là bắt buộc"),
    maTheBaoHanh: Yup.string(),
    vatLieu: Yup.string(),
    labo: Yup.string(),
    loaiDia: Yup.string(),
    soLuongRang: Yup.number(),
    viTriRang: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      AUTO_ID: khachHang.AUTO_ID,
      tenKhach: khachHang.TEN_KHACH,
      nhaKhoa: khachHang.TEN_NHA_KHOA,
      tenBacSi: khachHang.TEN_NHAN_VIEN,
      ngayKichHoat: khachHang.NGAY_KICH_HOAT,
      ngayHetHan: khachHang.NGAY_HET_HAN,
      maTheBaoHanh: khachHang.MA_THE_BAO_HANH,
      vatLieu: khachHang.VAT_LIEU,
      labo: khachHang.LABO,
      loaiDia: khachHang.LOAI_DIA,
      soLuongRang: khachHang.SO_LUONG_RANG,
      viTriRang: khachHang.VI_TRI_RANG,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`/api/khachhang/${id}`, values);
        toast.success("Cập nhật khách hàng thành công");
        navigate("/khachhang");
      } catch (error) {
        console.error("Error updating khách hàng:", error);
        toast.error("Lỗi khi cập nhật khách hàng");
      }
    },
  });

  const calculateExpirationDate = () => {
    const currentDate = new Date(formik.values.ngayKichHoat);
    currentDate.setMonth(currentDate.getMonth() + selectedMonth);
    return currentDate.toISOString().slice(0, 10);
  };

  useEffect(() => {
    formik.setFieldValue("ngayHetHan", calculateExpirationDate());
  }, [selectedMonth]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Cập nhật Khách Hàng
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên Khách Hàng"
            name="tenKhach"
            value={formik.values.tenKhach}
            onChange={formik.handleChange}
            error={formik.touched.tenKhach && Boolean(formik.errors.tenKhach)}
            helperText={formik.touched.tenKhach && formik.errors.tenKhach}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên Nha Khoa"
            name="nhaKhoa"
            value={formik.values.nhaKhoa}
            onChange={formik.handleChange}
            // error={formik.touched.nhaKhoa && Boolean(formik.errors.nhaKhoa)}
            // helperText={formik.touched.nhaKhoa && formik.errors.nhaKhoa}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="bac-si-select-label">Bác Sĩ</InputLabel>
            <Select
              labelId="bac-si-select-label"
              id="bac-si-select"
              name="tenBacSi"
              value={formik.values.tenBacSi}
              onChange={formik.handleChange}
            >
              {bacSiOptions.map((option) => (
                <MenuItem key={option.AUTO_ID} value={option.TEN_NHAN_VIEN}>
                  {option.TEN_NHAN_VIEN}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Số Tháng</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {[...Array(12).keys()].map((i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mã Thẻ Bảo Hành"
            name="maTheBaoHanh"
            value={formik.values.maTheBaoHanh}
            onChange={formik.handleChange}
            error={
              formik.touched.maTheBaoHành && Boolean(formik.errors.maTheBaoHành)
            }
            helperText={
              formik.touched.maTheBaoHành && formik.errors.maTheBaoHành
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vật Liệu"
            name="vatLieu"
            value={formik.values.vatLieu}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Labo"
            name="labo"
            value={formik.values.labo}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Loại Dĩa"
            name="loaiDia"
            value={formik.values.loaiDia}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số Lượng Răng"
            name="soLuongRang"
            type="number"
            value={formik.values.soLuongRang}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vị Trí Răng"
            name="viTriRang"
            value={formik.values.viTriRang}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật Khách Hàng
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default KhUpdate;
