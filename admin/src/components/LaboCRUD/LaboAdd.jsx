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
const LaboAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenLabo, setTenLabo] = useState(""); // State for tên labo
  const [laboList, setLaboList] = useState([]); // State for labo list
  const [filteredLaboList, setFilteredLaboList] = useState([]); // State for filtered labo list
  useEffect(() => {
    const fetchLaboList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Labo`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setLaboList(response.data);
          setFilteredLaboList(response.data);
        } else {
          // Xử lý lỗi từ server
          setOpen(true);
          setSeverity("error");
          setMessage(response.data.message || "Đã có lỗi xảy ra.");
        }
      } catch (error) {
        // Xử lý lỗi
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi kết nối đến server!");
      }
    };

    fetchLaboList();
  }, []);

  // search labo list
  const handleTenLaboChange = (event) => {
    setTenLabo(event.target.value);
    // Filter labo list based on input
    const filteredList = laboList.filter((labo) =>
      labo.TEN_LABO.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredLaboList(filteredList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenLabo) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập tên labo!");
      return;
    }

    // Kiểm tra xem labo đã tồn tại hay chưa
    const isLaboExists = filteredLaboList.some(
      (labo) => labo.TEN_LABO.toLowerCase() === tenLabo.toLowerCase()
    );

    if (isLaboExists) {
      setOpen(true);
      setSeverity("error");
      setMessage("Labo đã tồn tại!");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/Labo`, // Sử dụng VITE_API_BASE_URL
      { TEN_LABO: tenLabo },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // Xử lý khi thêm labo thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Thêm labo thành công!");
      // Chuyển hướng về trang danh sách labo
      navigate("/labo");
    } else {
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ server
      if (errorData.code === "ER_DUP_ENTRY") {
        // Kiểm tra mã lỗi
        setOpen(true);
        setSeverity("error");
        setMessage(errorData.message); // Use errorData.message
      } else {
        setOpen(true);
        setSeverity("error");
        setMessage(errorData.message); // Use errorData.message
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
          <Title>Thêm labo</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên labo"
                  name="TEN_LABO"
                  value={tenLabo}
                  onChange={handleTenLaboChange} // Use the new handler
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
                  href={`/labo`}
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
          {/* Hiển thị danh sách labo */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách labo đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Labo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLaboList.map((labo) => (
                  <TableRow key={labo.MA_LABO}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {labo.TEN_LABO}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default LaboAdd;
