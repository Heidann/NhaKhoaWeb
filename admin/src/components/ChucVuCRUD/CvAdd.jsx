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
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";

const CvAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [tenChucVu, setTenChucVu] = useState("");
  const [chucVuList, setChucVuList] = useState([]);

  useEffect(() => {
    const fetchChucVuList = async () => {
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
        setChucVuList(response.data); // Axios tự động parse JSON
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchChucVuList();
  }, []);

  const handleChange = (event) => {
    setTenChucVu(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Kiểm tra rỗng trước khi gửi request
    if (tenChucVu.trim() === "") {
      setSnackbarSeverity("error");
      setSnackbarMessage("Vui lòng nhập tên chức vụ!");
      setOpenSnackbar(true);
      return; // Dừng xử lý nếu tên chức vụ rỗng
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/Chuc_Vu`, // Sử dụng VITE_API_BASE_URL
        { TEN_CHUC_VU: tenChucVu }, // Axios tự động stringify
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 201) {
        // Kiểm tra status 201 (Created)
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm chức vụ thành công!");
        setOpenSnackbar(true);
        navigate("/chuc-vu");
      } else {
        // Xử lý lỗi từ server
        if (response.status === 403) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Bạn không có quyền truy cập chức năng này!");
        } else {
          // Axios tự động parse JSON error
          setSnackbarSeverity("error");
          setSnackbarMessage(response.data.message || "Lỗi server");
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
          <Title>Thêm chức vụ</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên chức vụ"
                  name="TEN_CHUC_VU"
                  value={tenChucVu}
                  onChange={handleChange}
                />
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
                  href={`/chuc-vu`}
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
          {/* Hiển thị danh sách chức vụ */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách chức vụ đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Chức Vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chucVuList.map((chucVu) => (
                  <TableRow key={chucVu.AUTO_ID}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {chucVu.TEN_CHUC_VU}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
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

export default CvAdd;
