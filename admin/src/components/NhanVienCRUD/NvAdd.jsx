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
import CenteredNotification from "../CenteredNotification.jsx";
import axios from "axios";
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

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const fetchChucVuList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Chuc_Vu`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          setChucVuList(response.data);
        } else {
          // Xử lý lỗi từ server
          if (response.status === 403) {
            setNotificationOpen(true);
            return;
          } else {
            setOpen(true);
            setSeverity("error");
            setMessage(response.data.message || "Đã có lỗi xảy ra.");
          }
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
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          setNhanVienList(response.data);
          setFilteredNhanVienList(response.data); // Initialize filtered list
        } else {
          // Xử lý lỗi từ server
          setOpen(true);
          setSeverity("error");
          setMessage(response.data.message || "Đã có lỗi xảy ra.");
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

    if (!tenTaiKhoan || !tenNhanVien || !sdt || !matKhau || !chucVuId) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      console.log(tenTaiKhoan, tenNhanVien, sdt, matKhau, chucVuId, cccd);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan`, // Sử dụng VITE_API_BASE_URL
        {
          TEN_TAI_KHOAN: tenTaiKhoan,
          TEN_NHAN_VIEN: tenNhanVien,
          CCCD: cccd,
          SDT: sdt,
          MAT_KHAU: matKhau,
          CHUC_VU_ID: chucVuId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Xử lý khi thêm nhân viên thành công
        setOpen(true);
        setSeverity("success");
        setMessage("Thêm nhân viên thành công!");
        // Chuyển hướng về trang danh sách nhân viên
        navigate("/nhan-vien");
      } else {
        // Xử lý lỗi từ server
        if (response.status === 403) {
          setNotificationOpen(true);
          return;
        } else {
          setOpen(true);
          setSeverity("error");
          setMessage(response.data.message || "Đã có lỗi xảy ra.");
        }
      }
    } catch (error) {
      // Xử lý lỗi
      setOpen(true);
      setSeverity("error");
      setMessage("Lỗi kết nối đến server!");
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
                      <MenuItem key={chucVu.AUTO_ID} value={chucVu.AUTO_ID}>
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
      <CenteredNotification
        open={notificationOpen}
        onClose={handleCloseNotification}
        message={
          <h3 style={{ color: "red" }}>
            Bạn không có quyền truy cập chức năng này
          </h3>
        }
        onAfterClose={() => navigate("/")}
      />
    </Paper>
  );
};

export default NvAdd;
