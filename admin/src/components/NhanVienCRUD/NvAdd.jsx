import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

const NvAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenTaiKhoan, setTenTaiKhoan] = useState("");
  const [tenNhanVien, setTenNhanVien] = useState("");
  const [cccd, setCccd] = useState("");
  const [sdt, setSdt] = useState("");
  const [matKhau, setMatKhau] = useState(""); // Default password to SDT
  const [chucVuId, setChucVuId] = useState(""); // State for chức vụ ID
  const [chucVuList, setChucVuList] = useState([]); // State for chức vụ list
  const [nhanVienList, setNhanVienList] = useState([]); // State for nhân viên list
  const [filteredNhanVienList, setFilteredNhanVienList] = useState([]); // State for filtered nhân viên list

  useEffect(() => {
    const fetchChucVuList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/Chuc_Vu");
        if (response.ok) {
          const data = await response.json();
          setChucVuList(data);
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

  useEffect(() => {
    const fetchNhanVienList = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/Tai_Khoan"
        );
        if (response.ok) {
          const data = await response.json();
          setNhanVienList(data);
          setFilteredNhanVienList(data); // Initialize filtered list
        } else {
          // Xử lý lỗi
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi khi lấy danh sách nhân viên!");
        }
      } catch (error) {
        // Xử lý lỗi
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi kết nối đến server!");
      }
    };
    fetchNhanVienList();
  }, []);

  const handleTenTaiKhoanChange = (event) => {
    setTenTaiKhoan(event.target.value);
    // Filter nhân viên list based on input
    const filteredList = nhanVienList.filter((nhanVien) =>
      nhanVien.TEN_TAI_KHOAN.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredNhanVienList(filteredList);
  };

  const handleTenNhanVienChange = (event) => {
    setTenNhanVien(event.target.value);
  };

  const handleCccdChange = (event) => {
    setCccd(event.target.value);
  };

  const handleSdtChange = (event) => {
    setSdt(event.target.value);
    setMatKhau(event.target.value); // Set password to SDT when SDT changes
  };

  const handleMatKhauChange = (event) => {
    setMatKhau(event.target.value);
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
      !matKhau ||
      !chucVuId
    ) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/admin/Tai_Khoan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TEN_TAI_KHOAN: tenTaiKhoan,
        TEN_NHAN_VIEN: tenNhanVien,
        CCCD: cccd,
        SDT: sdt,
        MAT_KHAU: matKhau,
        CHUC_VU_ID: chucVuId,
      }),
    });
    if (response.ok) {
      // Xử lý khi thêm nhân viên thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Thêm nhân viên thành công!");
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
          <Title>Thêm nhân viên</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
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
                  label="Mật khẩu"
                  name="MAT_KHAU"
                  type="password"
                  value={matKhau}
                  onChange={handleMatKhauChange}
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
                  Thêm
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
                {filteredNhanVienList.map((nhanVien) => (
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
                ))}
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

export default NvAdd;
