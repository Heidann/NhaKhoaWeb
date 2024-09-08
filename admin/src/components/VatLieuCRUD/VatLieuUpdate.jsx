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
import CenteredNotification from "../CenteredNotification";
import axios from "axios";

const VatLieuUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenVatLieu, setTenVatLieu] = useState("");
  const [vatLieuList, setVatLieuList] = useState([]);
  const [filteredVatLieuList, setFilteredVatLieuList] = useState([]);

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Vat_Lieu/${id}`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setTenVatLieu(response.data[0].TEN_VAT_LIEU);
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
    const fetchVatLieuList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/Vat_Lieu`, // Sử dụng VITE_API_BASE_URL
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setVatLieuList(response.data);
          setFilteredVatLieuList(response.data);
        } else {
          // Xử lý lỗi
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi khi lấy danh sách vật liệu!");
        }
      } catch (error) {
        // Xử lý lỗi
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi kết nối đến server!");
      }
    };

    fetchVatLieuList();
  }, []);

  const handleTenVatLieuChange = (event) => {
    setTenVatLieu(event.target.value);
    const filteredList = vatLieuList.filter((vatLieu) =>
      vatLieu.TEN_VAT_LIEU.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredVatLieuList(filteredList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenVatLieu) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập tên vật liệu!");
      return;
    }

    const isVatLieuExists = filteredVatLieuList.some(
      (vatLieu) =>
        vatLieu.TEN_VAT_LIEU.toLowerCase() === tenVatLieu.toLowerCase()
    );

    if (isVatLieuExists) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vật liệu đã tồn tại!");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/Vat_Lieu/${id}`, // Sử dụng VITE_API_BASE_URL
        { TEN_VAT_LIEU: tenVatLieu },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setOpen(true);
        setSeverity("success");
        setMessage("Cập nhật vật liệu thành công!");
        navigate("/vat-lieu");
      } else if (response.status === 403) {
        setNotificationOpen(true);
        return;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setOpen(true);
      setSeverity("error");
      setMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
          <Title>Cập nhật vật liệu</Title> {/* Thay đổi title */}
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
                  label="Tên vật liệu" // Thay đổi label
                  name="TEN_VAT_LIEU" // Thay đổi tên trường
                  value={tenVatLieu}
                  onChange={handleTenVatLieuChange}
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
                  href={`/vat-lieu`} // Thay đổi đường dẫn
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
          {/* Hiển thị danh sách vật liệu */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách vật liệu đã tồn tại: {/* Thay đổi text */}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Vật Liệu</TableCell> {/* Thay đổi text */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVatLieuList.map((vatLieu) => (
                  <TableRow key={vatLieu.AUTO_ID}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {vatLieu.TEN_VAT_LIEU} {/* Thay đổi tên trường */}
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

export default VatLieuUpdate;
