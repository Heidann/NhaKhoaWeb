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
const defaultTheme = createTheme();

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      console.log(username);

      // Gửi yêu cầu cập nhật mật khẩu đến API
      const updatePasswordResponse = await fetch(
        `http://localhost:3000/api/admin/Tai_Khoan/change_password`, // Thay thế bằng đường dẫn API của bạn
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            TEN_TAI_KHOAN: username,
            MAT_KHAU_CU: oldPassword,
            MAT_KHAU_MOI: newPassword,
          }),
        }
      );

      if (updatePasswordResponse.ok) {
        // Xử lý khi cập nhật mật khẩu thành công
        setSuccessMessage("Cập nhật mật khẩu thành công.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        // Xử lý khi cập nhật mật khẩu thất bại
        const errorData = await updatePasswordResponse.json();
        setErrorMessage(errorData.message || "Cập nhật mật khẩu thất bại.");
      }
    } catch (error) {
      console.error("Lỗi kết nối đến server", error);
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
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
