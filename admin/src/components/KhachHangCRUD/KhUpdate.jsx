import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import CenteredNotification from "../CenteredNotification";
import axios from "axios";
const KhUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [khachHangDetail, setKhachHangDetail] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [tenKhach, setTenKhach] = useState("");
  const [theBaoHanhId, setTheBaoHanhId] = useState("");
  const [phone, setPhone] = useState("");
  const [maTheBaoHanh, setMaTheBaoHanh] = useState("");

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };
  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Khach_Hang/${id}`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 403) {
          setNotificationOpen(true);
          return;
        }

        const data = response.data;
        console.log(data);

        setKhachHangDetail(data);
        setTenKhach(data[0].TEN_KHACH);
        setTheBaoHanhId(data[0].THE_BAO_HANH_ID);
        setPhone(data[0].SDT);
        setMaTheBaoHanh(data[0].MA_THE_BAO_HANH);
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
        if (error.response && error.response.status === 403) {
          setNotificationOpen(true);
        }
      }
    };
    fetchDataDetail();
  }, [id]);

  useEffect(() => {
    const fetchTheBaoHAnhData = async () => {
      if (maTheBaoHanh) {
        try {
          const resMaTheBaoHanh = await axios.get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/The_Bao_Hanh/code/${maTheBaoHanh}`, // Sử dụng VITE_API_BASE_URL
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );

          if (resMaTheBaoHanh.status === 403) {
            setNotificationOpen(true);
            return;
          }

          const theBaoHanhData = resMaTheBaoHanh.data;
          console.log("theBaoHanhData:", theBaoHanhData);

          if (theBaoHanhData.length > 0) {
            setTheBaoHanhId(theBaoHanhData[0].AUTO_ID);
            console.log("theBaoHanhId:", theBaoHanhId);
          } else {
            handleSnackbarOpen("error", "Mã thẻ bảo hành không tồn tại!");
          }
        } catch (error) {
          console.error("Error fetching The Bao Hanh:", error);
          handleSnackbarOpen("error", "Lỗi khi lấy thông tin thẻ bảo hành!");
          if (error.response && error.response.status === 403) {
            setNotificationOpen(true);
          }
        }
      }
    };
    fetchTheBaoHAnhData();
  }, [maTheBaoHanh]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("maTheBaoHanh before fetch:", maTheBaoHanh);
      console.log("theBaoHanhId before fetch:", theBaoHanhId);

      try {
        console.log("maTheBaoHanh after fetch:", maTheBaoHanh);
        console.log("theBaoHanhId after fetch:", theBaoHanhId);

        const khResponse = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/Khach_Hang/${id}`, // Sử dụng VITE_API_BASE_URL
          {
            TEN_KHACH: tenKhach,
            THE_BAO_HANH_ID: theBaoHanhId,
            SDT: phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (khResponse.status === 200) {
          handleSnackbarOpen("success", "Cập nhật khách hàng thành công!");
          navigate("/khach-hang");
        } else {
          handleSnackbarOpen("error", "Lỗi khi cập nhật khách hàng!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        handleSnackbarOpen("error", "Lỗi khi cập nhật khách hàng!");
        if (error.response && error.response.status === 403) {
          setNotificationOpen(true);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      handleSnackbarOpen("error", "Lỗi khi cập nhật khách hàng!");
    }
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // handle error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // handle loading
  if (!khachHangDetail) {
    return <div>Loading...</div>;
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
          <Title>Cập nhật khách hàng</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <b>ID:</b> {khachHangDetail[0].AUTO_ID}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên khách hàng"
                  name="TEN_KHACH"
                  defaultValue={khachHangDetail[0].TEN_KHACH}
                  onChange={(e) => setTenKhach(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mã thẻ bảo hành"
                  name="MA_THE_BAO_HANH"
                  defaultValue={khachHangDetail[0].MA_THE_BAO_HANH}
                  onChange={(e) => setMaTheBaoHanh(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="SDT"
                  defaultValue={khachHangDetail[0].SDT}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>

              {/* Add more fields as needed */}
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
                  href={`/khach-hang`}
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa khách hàng?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa khách hàng này? Hành động này không thể
            hoàn tác.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
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

export default KhUpdate;
