import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Title";

const XuatXuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [xuatXuDetail, setXuatXuDetail] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Xuat_Xu/${id}`,
          {
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
        setXuatXuDetail(data[0]); // Assuming API returns an array with one object
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
        `http://localhost:3000/api/admin/Xuat_Xu/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Xóa xuất xứ thành công!");
        setOpenSnackbar(true);
        navigate("/xuat-xu"); // Redirect to the Xuat_Xu list page
      } else {
        // Handle errors from server
        if (response.status === 403) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Bạn không có quyền truy cập chức năng này!");
        } else {
          const errorData = await response.json();
          setSnackbarSeverity("error");
          setSnackbarMessage(errorData.message);
        }
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError(error);
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
  if (!xuatXuDetail) {
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
          <Title>Chi tiết xuất xứ</Title>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>ID:</b> {xuatXuDetail.AUTO_ID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <b>Tên xuất xứ:</b> {xuatXuDetail.TEN_XUAT_XU}
              </Typography>
            </Grid>
            {/* Add more fields as needed */}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          href={`/xuat-xu`}
          startIcon={<KeyboardArrowLeft />}
          sx={{ mr: 2, backgroundColor: "gray", color: "white" }}
        >
          Quay Lại
        </Button>
        <Button
          variant="contained"
          href={`/xuat-xu/${id}/chinh-sua`}
          startIcon={<EditIcon />}
          sx={{ mr: 2, backgroundColor: "#4CAF50", color: "white" }}
        >
          Cập nhật
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          startIcon={<DeleteForeverIcon />}
          sx={{ backgroundColor: "#f44336", color: "white" }}
        >
          Xóa
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa xuất xứ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa xuất xứ này? Hành động này không thể hoàn
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

export default XuatXuDetail;
