import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Title";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
const NvDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nhanVienDetail, setNhanVienDetail] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchDataDetail = async () => {
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
          setNhanVienDetail(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
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
        // Xóa thành công
        setSnackbarSeverity("success");
        setSnackbarMessage("Xóa nhân viên thành công!");
        setOpenSnackbar(true);
        navigate("/nhan-vien"); // Chuyển hướng sau khi xóa
      } else {
        // Xử lý lỗi từ server
        if (response.status === 403) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Bạn không có quyền truy cập chức năng này!");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(
            response.data.message || "Xóa nhân viên thất bại!"
          ); // Lấy message lỗi (nếu có)
        }
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    handleCloseDialog();
  };

  const handleCloseSnackbar = (event, reason) => {
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
  if (!nhanVienDetail) {
    return <div>Loading...</div>;
  }

  const styleText = {
    fontSize: 18,
    lineHeight: 1.4,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: "auto",
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Avatar
            alt="Profile Picture"
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Title>Chi tiết nhân viên</Title>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>ID:</b> {nhanVienDetail[0].AUTO_ID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên nhân viên:</b> {nhanVienDetail[0].TEN_NHAN_VIEN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên tài khoản:</b> {nhanVienDetail[0].TEN_TAI_KHOAN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Số điện thoại:</b> {nhanVienDetail[0].SDT}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>CCCD:</b> {nhanVienDetail[0].CCCD}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Chức vụ ID:</b> {nhanVienDetail[0].CHUC_VU_ID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Mã chức vụ:</b> {nhanVienDetail[0].MA_CHUC_VU}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên chức vụ:</b> {nhanVienDetail[0].TEN_CHUC_VU}
              </Typography>
            </Grid>
            {/* Add more fields as needed */}
          </Grid>
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
        {/* Xóa nút xóa nếu là admin */}
        {(nhanVienDetail[0].TEN_TAI_KHOAN !== "admin" ||
          nhanVienDetail[0].AUTO_ID !== 10000000) && (
          <Grid item xs={12} md={3}>
            <Button
              sx={{
                padding: "10px 20px",
                width: "100%",
                backgroundColor: "#f44336",
                color: "white",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#e53935",
                },
              }}
              variant="contained"
              onClick={() => setOpenDialog(true)}
            >
              <DeleteForeverIcon />
              Xóa
            </Button>
          </Grid>
        )}
        <Grid item xs={12} md={3}>
          <Button
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
            href={`/nhan-vien/${id}/chinh-sua`}
          >
            <EditIcon />
            Cập nhật
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa nhân viên?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa nhân viên này? Hành động này không thể
            hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NvDetail;
