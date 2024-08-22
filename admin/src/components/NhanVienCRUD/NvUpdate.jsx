import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

const NvUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [autoId, setAutoId] = useState("");
  const [tenTaiKhoan, setTenTaiKhoan] = useState("");
  const [tenNhanVien, setTenNhanVien] = useState("");
  const [cccd, setCccd] = useState("");
  const [sdt, setSdt] = useState("");
  const [matKhauCu, setMatKhauCu] = useState(""); // State for old password
  const [matKhauMoi, setMatKhauMoi] = useState(""); // State for new password
  const [chucVuId, setChucVuId] = useState(""); // State for chức vụ ID
  const [chucVuList, setChucVuList] = useState([]); // State for chức vụ list
  const [filteredChucVuList, setFilteredChucVuList] = useState([]); // State for filtered chức vụ list

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Tai_Khoan/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAutoId(data[0].AUTO_ID);
        setTenTaiKhoan(data[0].TEN_TAI_KHOAN);
        setTenNhanVien(data[0].TEN_NHAN_VIEN);
        setCccd(data[0].CCCD);
        setSdt(data[0].SDT);
        setChucVuId(data[0].CHUC_VU_ID); // Initialize chucVuId state
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  useEffect(() => {
    const fetchChucVuList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/Chuc_Vu");
        if (response.ok) {
          const data = await response.json();
          setChucVuList(data);
          setFilteredChucVuList(data); // Initialize filtered list
        } else {
          // Xử lý lỗi
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi khi lấy danh sách chức vụ!");
        }
      } catch (error) {
        // Xử lý lỗi
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi kết nối đến server!");
      }
    };
    fetchChucVuList();
  }, []);

  const handleTenTaiKhoanChange = (event) => {
    setTenTaiKhoan(event.target.value);
  };

  const handleTenNhanVienChange = (event) => {
    setTenNhanVien(event.target.value);
  };

  const handleCccdChange = (event) => {
    setCccd(event.target.value);
  };

  const handleSdtChange = (event) => {
    setSdt(event.target.value);
  };

  const handleMatKhauCuChange = (event) => {
    setMatKhauCu(event.target.value);
  };

  const handleMatKhauMoiChange = (event) => {
    setMatKhauMoi(event.target.value);
  };

  const handleChucVuIdChange = (event) => {
    setChucVuId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !tenTaiKhoan ||
      !tenNhanVien ||
      !cccd ||
      !sdt ||
      !matKhauCu ||
      !matKhauMoi ||
      !chucVuId
    ) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/admin/Tai_Khoan/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TEN_TAI_KHOAN: tenTaiKhoan,
          TEN_NHAN_VIEN: tenNhanVien,
          CCCD: cccd,
          SDT: sdt,
          MAT_KHAU: matKhauMoi,
          CHUC_VU_ID: chucVuId,
        }),
      }
    );
    if (response.ok) {
      // Xử lý khi cập nhật nhân viên thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Cập nhật nhân viên thành công!");
      // Chuyển hướng về trang danh sách nhân viên
      navigate("/nhan-vien");
    } else {
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ server
      if (errorData.code === "ER_DUP_ENTRY") {
        // Kiểm tra mã lỗi
        setOpen(true);
        setSeverity("error");
        setMessage(errorData.message); // Use errorData.message
      } else {
        setOpen(true);
        setSeverity("error");
        setMessage(errorData.message); // Use errorData.message
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // handle error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <EditIcon
            sx={{
              color: "primary.main",
              fontSize: 24,
              marginLeft: "auto",
              width: 120,
              height: 120,
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Title>Cập nhật nhân viên</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <b>ID:</b> {autoId}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên tài khoản"
                  name="TEN_TAI_KHOAN"
                  value={tenTaiKhoan}
                  onChange={handleTenTaiKhoanChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên nhân viên"
                  name="TEN_NHAN_VIEN"
                  value={tenNhanVien}
                  onChange={handleTenNhanVienChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CCCD"
                  name="CCCD"
                  value={cccd}
                  onChange={handleCccdChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="SDT"
                  value={sdt}
                  onChange={handleSdtChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mật khẩu cũ"
                  name="MAT_KHAU_CU"
                  type="password"
                  value={matKhauCu}
                  onChange={handleMatKhauCuChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mật khẩu mới"
                  name="MAT_KHAU_MOI"
                  type="password"
                  value={matKhauMoi}
                  onChange={handleMatKhauMoiChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="chuc-vu-id-label">Chức vụ</InputLabel>
                  <Select
                    labelId="chuc-vu-id-label"
                    id="chuc-vu-id"
                    value={chucVuId}
                    onChange={handleChucVuIdChange}
                  >
                    {chucVuList.map((chucVu) => (
                      <MenuItem
                        key={chucVu.MA_CHUC_VU}
                        value={chucVu.MA_CHUC_VU}
                      >
                        {chucVu.TEN_CHUC_VU}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} justifyContent="flex-end">
              <Grid item xs={12} md={3}>
                <Button
                  sx={{
                    width: "100%",
                    padding: "10px 20px",
                    backgroundColor: "gray",
                    color: "white",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#e53935",
                    },
                  }}
                  variant="contained"
                  href={`/nhan-vien`}
                >
                  {/* icon */}
                  <KeyboardArrowLeft />
                  Quay Lại
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  sx={{
                    padding: "10px 20px",
                    width: "100%",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                  }}
                  variant="contained"
                >
                  <EditIcon />
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* Hiển thị danh sách Tài Khoản của nhân viên */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách Tài Khoản của nhân viên đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tài Khoản</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredNhanVienList.map((nhanVien) => (
                  <TableRow key={nhanVien.AUTO_ID}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {nhanVien.TEN_TAI_KHOAN}
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NvUpdate;
