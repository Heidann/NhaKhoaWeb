import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
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

const NvDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nhanVienDetail, setNhanVienDetail] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for Snackbar severity
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

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
        setNhanVienDetail(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Kiểm tra xem nhân viên có phải là admin (mã 10000000) hay không
      if (nhanVienDetail[0].AUTO_ID === 10000000) {
        // Nếu là admin, hiển thị thông báo lỗi
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Không thể xóa nhân viên quản trị!");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/api/admin/Tai_Khoan/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Chuyển hướng về trang danh sách nhân viên sau khi xóa thành công
      navigate("/nhan-vien");
    } catch (error) {
      setError(error);
      console.error("Error deleting data:", error);
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
            src={nhanVienDetail[0].HINH_ANH} // Assuming you have an image field
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
