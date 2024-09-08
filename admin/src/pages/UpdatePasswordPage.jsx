import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const defaultTheme = createTheme();

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      // Lấy AUTO_ID của user từ localStorage (giả sử bạn đã lưu nó sau khi đăng nhập)
      const username = localStorage.getItem("TEN_TAI_KHOAN");

      // Sử dụng Axios để gửi yêu cầu PUT
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan/change_password`, // Sử dụng VITE_API_BASE_URL
        {
          TEN_TAI_KHOAN: username,
          MAT_KHAU_CU: oldPassword,
          MAT_KHAU_MOI: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Xử lý khi cập nhật mật khẩu thành công
      setSuccessMessage("Cập nhật mật khẩu thành công.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      // Xử lý lỗi từ Axios
      if (error.response) {
        // Lỗi từ server (ví dụ: 401, 404)
        console.error("Lỗi server:", error.response.data);
        setErrorMessage(
          error.response.data.message || "Cập nhật mật khẩu thất bại."
        );
      } else if (error.request) {
        // Yêu cầu được gửi đi nhưng không nhận được phản hồi
        console.error("Lỗi kết nối:", error.request);
        setErrorMessage("Lỗi kết nối đến server.");
      } else {
        // Lỗi khác (ví dụ: lỗi khi tạo request)
        console.error("Lỗi:", error.message);
        setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đổi Mật Khẩu
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
              {successMessage}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  label="Mật khẩu cũ"
                  type="password"
                  id="oldPassword"
                  autoComplete="current-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cập nhật mật khẩu
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
