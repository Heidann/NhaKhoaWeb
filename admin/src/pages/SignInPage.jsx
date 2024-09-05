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
import Alert from "@mui/material/Alert"; // Thêm import Alert
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
      const login = await fetch(
        "http://localhost:3000/api/admin/Tai_Khoan/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TEN_TAI_KHOAN: username,
            MAT_KHAU: password,
          }),
        }
      );

      if (login.ok) {
        const data = await login.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("TEN_TAI_KHOAN", username);
        navigate("/");
      } else {
        const errorData = await login.json();
        console.error("Lỗi đăng nhập", errorData);

        // Kiểm tra message từ server và hiển thị thông báo lỗi tương ứng
        if (errorData.message === "Tài khoản không tồn tại") {
          setError("Sai tên tài khoản");
        } else if (errorData.message === "Sai mật khẩu") {
          setError("Sai mật khẩu");
        } else {
          setError("Lỗi đăng nhập. Vui lòng thử lại sau.");
        }
      }
    } catch (error) {
      console.error("Lỗi kết nối đến server", error);
      setError("Lỗi kết nối đến server. Vui lòng thử lại sau.");
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
