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
  DialogActions,
  Typography,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  const [createBy, setCreateBy] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Khach_Hang/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setKhachHangDetail(data);
        setTenKhach(data[0].TEN_KHACH);
        setTheBaoHanhId(data[0].THE_BAO_HANH_ID);
        setPhone(data[0].SDT);
        setCreateBy(data[0].CREATE_BY);
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
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate(`/khach-hang`);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/The_Bao_Hanh/code/${theBaoHanhId}`
      );

      if (!response.ok) {
        // Thẻ bảo hành không tồn tại
        handleSnackbarOpen("error", "Mã thẻ bảo hành không tồn tại!");
        return;
      }

      const theBaoHanhData = await response.json();
      if (theBaoHanhData.length > 0) {
        const theBaoHanhId = theBaoHanhData[0].AUTO_ID;

        // Send PUT request with THE_BAO_HANH_ID
        const khResponse = await fetch(
          `http://localhost:3000/api/admin/Khach_Hang/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              TEN_KHACH: tenKhach,
              THE_BAO_HANH_ID: theBaoHanhId,
              SDT: phone,
              CREATE_BY: createBy,
            }),
          }
        );

        if (khResponse.ok) {
          handleSnackbarOpen("success", "Cập nhật khách hàng thành công!");
          navigate("/khach-hang");
        } else {
          handleSnackbarOpen("error", "Lỗi khi cập nhật khách hàng!");
        }
      } else {
        // Thẻ bảo hành không tồn tại
        handleSnackbarOpen("error", "Mã thẻ bảo hành không tồn tại!");
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
                  name="THE_BAO_HANH_ID"
                  defaultValue={khachHangDetail[0].MA_THE_BAO_HANH}
                  onChange={(e) => setTheBaoHanhId(e.target.value)}
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Người tạo"
                  name="CREATE_BY"
                  defaultValue={khachHangDetail[0].CREATE_BY}
                  onChange={(e) => setCreateBy(e.target.value)}
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
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default KhUpdate;
