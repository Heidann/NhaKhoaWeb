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
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import CenteredNotification from "../CenteredNotification";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Title";

const KhDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [khDetail, setKhDetail] = useState(null); // Rename to khDetail
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
          `http://localhost:3000/api/admin/Khach_Hang/${id}`,
          {
            method: "GET",
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
        const data = await response.json();
        // format CREATE_BY
        data.forEach((item) => {
          item.CREATE_AT = item.CREATE_AT.slice(0, 10);
        });

        setKhDetail(data); // Use khDetail
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/Khach_Hang/${id}`,
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
      navigate("/khach-hang"); // Update to khach-hang
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

  // handle error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // handle loading
  if (!khDetail) {
    return <div>Loading...</div>;
  }

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
          <Title>Chi tiết khách hàng</Title> {/* Update title */}
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>ID:</b> {khDetail[0].AUTO_ID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>Tên khách hàng:</b> {khDetail[0].TEN_KHACH}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>Số điện thoại:</b> {khDetail[0].SDT || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>Mã thẻ bảo hành:</b> {khDetail[0].MA_THE_BAO_HANH}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>Ngày tạo:</b> {khDetail[0].CREATE_AT || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>Cập nhật cuối:</b> {khDetail[0].TEN_NHAN_VIEN || "N/A"}
              </Typography>
            </Grid>
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
            href={`/khach-hang`} // Update to khach-hang
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
            href={`/khach-hang/${id}/chinh-sua`} // Update to khach-hang
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
          {"Xác nhận xóa khách hàng?"} {/* Update dialog title */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa khách hàng này? Hành động này không thể
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

export default KhDetail;
