import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const KhAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenKhach, setTenKhach] = useState("");
  const [theBaoHanhId, setTheBaoHanhId] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [sdt, setSdt] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenKhach || !theBaoHanhId || !createBy || !createAt || !sdt) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/admin/Khach_Hang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TEN_KHACH: tenKhach,
        THE_BAO_HANH_ID: theBaoHanhId,
        CREATE_BY: createBy,
        CREATE_AT: createAt,
        SDT: sdt,
      }),
    });
    if (response.ok) {
      // Xử lý khi thêm khách hàng thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Thêm khách hàng thành công!");
      // Chuyển hướng về trang danh sách khách hàng
      navigate("/khach-hang");
    } else {
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ server
      setOpen(true);
      setSeverity("error");
      setMessage(errorData.message); // Use errorData.message
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
          <Title>Thêm Khách Hàng</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên Khách Hàng"
                  name="TEN_KHACH"
                  value={tenKhach}
                  onChange={(e) => setTenKhach(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mã Thẻ Bảo Hành"
                  name="THE_BAO_HANH_ID"
                  value={theBaoHanhId}
                  onChange={(e) => setTheBaoHanhId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Người Tạo"
                  name="CREATE_BY"
                  value={createBy}
                  onChange={(e) => setCreateBy(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ngày Tạo"
                  name="CREATE_AT"
                  value={createAt}
                  onChange={(e) => setCreateAt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số Điện Thoại"
                  name="SDT"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
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
                  href={`/khach-hang`}
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

export default KhAdd;
