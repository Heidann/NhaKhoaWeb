import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert, // Import Alert component
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Title";
import CenteredNotification from "../CenteredNotification";

const VatLieuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vatLieuDetail, setVatLieuDetail] = useState(null); // Đổi tên thành vatLieuDetail
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Vat_Lieu/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVatLieuDetail(data[0]); // Gán data[0] cho vatLieuDetail
      } catch (error) {
        setError(error.message); // Hiển thị thông báo lỗi
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/Vat_Lieu/${id}`,
        {
          method: "DELETE",
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
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/vat-lieu");
    } catch (error) {
      setError(error.message); // Hiển thị thông báo lỗi
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

  // handle error
  if (error) {
    return (
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  // handle loading
  if (!vatLieuDetail) {
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
          <DeleteForeverIcon
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
          <Title>Chi tiết vật liệu</Title> {/* Sửa title */}
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>ID:</b> {vatLieuDetail.AUTO_ID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên vật liệu:</b> {vatLieuDetail.TEN_VAT_LIEU}{" "}
                {/* Sửa tên trường */}
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
            href={`/vat-lieu`} // Sửa đường dẫn
          >
            {/* icon */}
            <KeyboardArrowLeft />
            Quay Lại
          </Button>
        </Grid>
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
            href={`/vat-lieu/${id}/chinh-sua`} // Sửa đường dẫn
          >
            <EditIcon />
            Cập nhật
          </Button>
        </Grid>
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
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa vật liệu?"} {/* Sửa title */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa vật liệu này? Hành động này không thể hoàn
            tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      {/* Thông báo khi không có quyền truy cập */}
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

export default VatLieuDetail;
