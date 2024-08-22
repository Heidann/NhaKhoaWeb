import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Title";

const CvUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chucVuDetail, setChucVuDetail] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tenChucVu, setTenChucVu] = useState(""); // State for chức vụ name
  const [chucVuList, setChucVuList] = useState([]); // State for chức vụ list
  const [filteredChucVuList, setFilteredChucVuList] = useState([]); // State for filtered chức vụ list
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for Snackbar severity
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Chuc_Vu/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChucVuDetail(data);
        setTenChucVu(data[0].TEN_CHUC_VU); // Set initial value for tenChucVu
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  useEffect(() => {
    const fetchChucVuList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/Chuc_Vu");
        if (response.ok) {
          const data = await response.json();
          setChucVuList(data);
          setFilteredChucVuList(data); // Initialize filtered list
        } else {
          // Xử lý lỗi
          handleSnackbarOpen("error", "Lỗi khi lấy danh sách chức vụ!");
        }
      } catch (error) {
        // Xử lý lỗi
        handleSnackbarOpen("error", "Lỗi kết nối đến server!");
      }
    };
    fetchChucVuList();
  }, []);

  const handleTenChucVuChange = (event) => {
    setTenChucVu(event.target.value);
    // Filter chức vụ list based on input
    const filteredList = chucVuList.filter((chucVu) =>
      chucVu.TEN_CHUC_VU.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredChucVuList(filteredList);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/Chuc_Vu/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate(`/chuc-vu`);
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

    // Kiểm tra xem chức vụ đã tồn tại hay chưa
    const isChucVuExists = filteredChucVuList.some(
      (chucVu) => chucVu.TEN_CHUC_VU.toLowerCase() === tenChucVu.toLowerCase()
    );

    if (isChucVuExists) {
      handleSnackbarOpen("error", "Chức vụ đã tồn tại!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/Chuc_Vu/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MA_CHUC_VU: event.target.MA_CHUC_VU.value,
            TEN_CHUC_VU: event.target.TEN_CHUC_VU.value,
          }),
        }
      );
      if (response.ok) {
        handleSnackbarOpen("success", "Cập nhật chức vụ thành công!");
        navigate("/chuc-vu");
      } else {
        handleSnackbarOpen("error", "Lỗi khi cập nhật chức vụ!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      handleSnackbarOpen("error", "Lỗi khi cập nhật chức vụ!");
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
  if (!chucVuDetail) {
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
          <Title>Cập nhật chức vụ</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <b>ID:</b> {chucVuDetail[0].AUTO_ID}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mã chức vụ"
                  name="MA_CHUC_VU"
                  defaultValue={chucVuDetail[0].MA_CHUC_VU}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên chức vụ"
                  name="TEN_CHUC_VU"
                  value={tenChucVu}
                  onChange={handleTenChucVuChange}
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
                  href={`/chuc-vu`}
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
          {/* Hiển thị danh sách chức vụ */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body2" mt={2}>
              Danh sách chức vụ đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Chức Vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredChucVuList.map((chucVu) => (
                  <TableRow key={chucVu.MA_CHUC_VU}>
                    <TableCell>{chucVu.TEN_CHUC_VU}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa chức vụ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa chức vụ này? Hành động này không thể hoàn
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
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CvUpdate;
