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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";
const XuatXuUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [tenXuatXu, setTenXuatXu] = useState(""); // State for tên xuất xứ
  const [xuatXuList, setXuatXuList] = useState([]); // State for xuất xứ list
  const [filteredXuatXuList, setFilteredXuatXuList] = useState([]); // State for filtered xuất xứ list

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Xuat_Xu/${id}`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setTenXuatXu(response.data[0].TEN_XUAT_XU);
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

  useEffect(() => {
    const fetchXuatXuList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Xuat_Xu`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setXuatXuList(response.data);
          setFilteredXuatXuList(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchXuatXuList();
  }, []);

  const handleTenXuatXuChange = (event) => {
    setTenXuatXu(event.target.value);
    // Filter xuất xứ list based on input
    const filteredList = xuatXuList.filter((xuatXu) =>
      xuatXu.TEN_XUAT_XU.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredXuatXuList(filteredList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenXuatXu) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Vui lòng nhập tên xuất xứ!");
      return;
    }

    // Kiểm tra xem xuất xứ đã tồn tại hay chưa
    const isXuatXuExists = filteredXuatXuList.some(
      (xuatXu) => xuatXu.TEN_XUAT_XU.toLowerCase() === tenXuatXu.toLowerCase()
    );

    if (isXuatXuExists) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Xuất xứ đã tồn tại!");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/Xuat_Xu/${id}`, // Sử dụng VITE_API_BASE_URL
        { TEN_XUAT_XU: tenXuatXu },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setOpenSnackbar(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Cập nhật xuất xứ thành công!");
        navigate("/xuat-xu");
      } else {
        if (response.status === 403) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Bạn không có quyền truy cập chức năng này!");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(response.data.message || "Đã có lỗi xảy ra.");
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

  // handle error
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
          <Title>Cập nhật xuất xứ</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  <b>ID:</b> {id}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên xuất xứ"
                  name="TEN_XUAT_XU"
                  value={tenXuatXu}
                  onChange={handleTenXuatXuChange}
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
                  href={`/xuat-xu`}
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
          {/* Hiển thị danh sách xuất xứ */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách xuất xứ đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Xuất Xứ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredXuatXuList.map((xuatXu) => (
                  <TableRow key={xuatXu.AUTO_ID}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {xuatXu.TEN_XUAT_XU}
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

export default XuatXuUpdate;
