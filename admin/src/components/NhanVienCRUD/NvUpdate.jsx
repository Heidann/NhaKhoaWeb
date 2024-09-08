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
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";
const NvUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [nhanVienData, setNhanVienData] = useState({
    AUTO_ID: "",
    TEN_TAI_KHOAN: "",
    TEN_NHAN_VIEN: "",
    CCCD: "",
    SDT: "",
    CHUC_VU_ID: "",
  });
  const [chucVuList, setChucVuList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan/${id}`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setNhanVienData(response.data[0]); // Assuming data is an array and you want the first element
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    const fetchChucVu = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Chuc_Vu`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setChucVuList(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchData();
    fetchChucVu();
  }, [id]);

  const handleChange = (event) => {
    setNhanVienData({
      ...nhanVienData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan/${id}`, // Sử dụng VITE_API_BASE_URL
        nhanVienData, // Gửi trực tiếp nhanVienData
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Cập nhật thông tin nhân viên thành công!");
        setOpenSnackbar(true);
        navigate("/nhan-vien");
      } else {
        // Xử lý lỗi từ server
        if (response.status === 403) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Bạn không có quyền truy cập chức năng này!");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(response.data.message || "Cập nhật thất bại!"); // Lấy message lỗi (nếu có)
        }
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

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
                  <b>ID:</b> {nhanVienData.AUTO_ID}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên tài khoản"
                  name="TEN_TAI_KHOAN"
                  value={nhanVienData.TEN_TAI_KHOAN}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên nhân viên"
                  name="TEN_NHAN_VIEN"
                  value={nhanVienData.TEN_NHAN_VIEN}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CCCD"
                  name="CCCD"
                  value={nhanVienData.CCCD}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="SDT"
                  value={nhanVienData.SDT}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="chuc-vu-id-label">Chức vụ</InputLabel>
                  <Select
                    labelId="chuc-vu-id-label"
                    id="chuc-vu-id"
                    name="CHUC_VU_ID"
                    value={nhanVienData.CHUC_VU_ID}
                    onChange={handleChange}
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
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NvUpdate;
