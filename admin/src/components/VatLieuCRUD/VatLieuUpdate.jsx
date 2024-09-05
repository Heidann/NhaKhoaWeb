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

const VatLieuUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenVatLieu, setTenVatLieu] = useState(""); // State for tên vật liệu
  const [vatLieuList, setVatLieuList] = useState([]); // State for vật liệu list
  const [filteredVatLieuList, setFilteredVatLieuList] = useState([]); // State for filtered vật liệu list

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Vat_Lieu/${id}`, // Thay đổi endpoint
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
        setTenVatLieu(data[0].TEN_VAT_LIEU); // Initialize tenVatLieu state
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  // Lấy danh sách vật liệu
  useEffect(() => {
    const fetchVatLieuList = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/Vat_Lieu",
          {
            // Thay đổi endpoint
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setVatLieuList(data);
          setFilteredVatLieuList(data); // Initialize filtered list
        } else {
          // Xử lý lỗi
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi khi lấy danh sách vật liệu!"); // Thay đổi message
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

  // Xử lý sự kiện chỉnh sửa tên vật liệu
  const handleTenVatLieuChange = (event) => {
    setTenVatLieu(event.target.value);
    // Filter vật liệu list based on input
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
      setMessage("Vui lòng nhập tên vật liệu!"); // Thay đổi message
      return;
    }

    // Kiểm tra xem vật liệu đã tồn tại hay chưa
    const isVatLieuExists = filteredVatLieuList.some(
      (vatLieu) =>
        vatLieu.TEN_VAT_LIEU.toLowerCase() === tenVatLieu.toLowerCase()
    );

    if (isVatLieuExists) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vật liệu đã tồn tại!"); // Thay đổi message
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/admin/Vat_Lieu/${id}`,
      {
        // Thay đổi endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          TEN_VAT_LIEU: tenVatLieu, // Thay đổi tên trường
        }),
      }
    );
    if (response.ok) {
      // Xử lý khi cập nhật vật liệu thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Cập nhật vật liệu thành công!"); // Thay đổi message
      // Chuyển hướng về trang danh sách vật liệu
      navigate("/vat-lieu"); // Thay đổi đường dẫn
    } else if (response.status === 403) {
      setNotificationOpen(true);
      return;
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
