import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import Alert from "@mui/material/Alert";
import axios from "axios";
const defaultTheme = createTheme();

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Thêm state để lưu thông báo lỗi

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Xóa thông báo lỗi khi submit

    try {
      // Sử dụng Axios để gửi yêu cầu POST
      const response = await axios.post(
        "http://localhost:3000/api/admin/Tai_Khoan/login", // Thay thế bằng URL API của bạn
        {
          TEN_TAI_KHOAN: username,
          MAT_KHAU: password,
        }
      );

      // Lấy dữ liệu từ response.data
      const data = response.data;

      // Lưu trữ access token trong localStorage
      localStorage.setItem("token", data.token);

      // Lưu trữ username trong localStorage
      localStorage.setItem("TEN_TAI_KHOAN", data.user[0].TEN_TAI_KHOAN);

      // Lưu trữ refresh token trong localStorage
      localStorage.setItem("refreshToken", data.refreshToken);

      navigate("/");
    } catch (error) {
      // Xử lý lỗi từ Axios
      if (error.response) {
        // Lỗi từ server (ví dụ: 401, 404)
        console.error("Lỗi server:", error.response.data);

        // Hiển thị thông báo lỗi từ server
        setError(error.response.data.message || "Lỗi đăng nhập.");
      } else if (error.request) {
        // Yêu cầu được gửi đi nhưng không nhận được phản hồi
        console.error("Lỗi kết nối:", error.request);
        setError("Lỗi kết nối đến server.");
      } else {
        // Lỗi khác (ví dụ: lỗi khi tạo request)
        console.error("Lỗi:", error.message);
        setError("Lỗi đăng nhập. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="100%">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ffffff ",
            borderRadius: 5,
            filter: "brightness(1.2) opacity(0.9)",
            padding: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#202A44" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Quay Lại Trang Tra Cứu"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignInPage;
