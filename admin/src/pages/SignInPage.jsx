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

const defaultTheme = createTheme();

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Xử lý đăng nhập tài khoản
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

        // Lưu token và TEN_TAI_KHOAN vào localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("TEN_TAI_KHOAN", username); // Lưu tên tài khoản
        navigate("/"); // Chuyển hướng đến trang admin
      } else {
        const errorData = await login.json();
        console.error("Lỗi đăng nhập", errorData);
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi kết nối đến server", error);
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
            // "linear-gradient( to bottom right,#202A44 0%, #384A77 37%,#5069AA 100%)",
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
