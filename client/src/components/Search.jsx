import { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Stack,
  Checkbox,
  Button,
  Typography,
  FormControlLabel,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"; // Thư viện để làm sạch dữ liệu đầu vào

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundImage:
    "linear-gradient( to bottom right,#202A44 0%, #384A77 37%,#5069AA 100%)",
  borderRadius: 15,
  filter: "brightness(1.2) opacity(0.9)",
}));

export default function Search() {
  const [maTheBaoHanh, setMaTheBaoHanh] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Sử dụng useMemo để tối ưu hóa error và checked
  const memoizedError = useMemo(() => error, [error]);
  const memoizedChecked = useMemo(() => checked, [checked]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra xem maTheBaoHanh có rỗng hay không
    if (!maTheBaoHanh.trim()) {
      setError("Vui lòng nhập mã thẻ bảo hành.");
      return;
    }

    // Kiểm tra xem checked có được chọn hay không
    if (!memoizedChecked) {
      setError("Vui lòng đồng ý với điều khoản.");
      return;
    }

    // Làm sạch dữ liệu đầu vào
    const sanitizedMaTheBaoHanh = DOMPurify.sanitize(maTheBaoHanh);

    // Chuyển hướng đến Sheet.jsx
    navigate(`/tra-cuu?maTheBaoHanh=${sanitizedMaTheBaoHanh}`);
    setError(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={0} sm={4} md={6}></Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Item
            sx={{
              border: "1px solid white",
              backgroundColor: "#2973ED",
              margin: 2,
              padding: {
                xs: 1,
                sx: 2,
                sm: 3,
                md: 3,
              },
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  textOverflow: "ellipsis",
                  fontWeight: 800,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.3rem",
                    md: "1.6rem",
                    lg: "2rem",
                    xl: "2.5rem",
                  },
                  margin: {
                    xs: 2,
                    sx: 1,
                    sm: 2,
                    md: 2,
                  },
                  padding: {
                    xs: 0,
                    sx: 1,
                    sm: 2,
                    md: 2,
                  },
                  textAlign: "center",
                  textTransform: "uppercase",
                  width: "80%",
                }}
              >
                tra cứu <br /> thông tin bảo hành
              </Typography>
              {memoizedError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {memoizedError}
                </Alert>
              )}
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <TextField
                  placeholder="C363205"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="maTheBaoHanh"
                  value={maTheBaoHanh}
                  onChange={(e) => setMaTheBaoHanh(e.target.value)}
                  autoComplete="search"
                  InputProps={{
                    startAdornment: <SearchIcon />,
                    style: {
                      fontWeight: "bold",
                      color: "black", // Thay đổi màu chữ thành đen
                      fontSize: 18,
                    },
                  }}
                />
              </Stack>
              <FormControlLabel
                control={<Checkbox value="checked" color="primary" />}
                label="Tôi đồng ý việc sử dụng các thông tin cá nhân cung cấp trên website này cho mục đích tra cứu."
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 0",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  "& .MuiFormControlLabel-label": {
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.8rem",
                      md: "1.1rem",
                      lg: "1.2rem",
                    },
                  },
                }}
                checked={memoizedChecked}
                onChange={(e) => setChecked(e.target.checked)}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  p: 1,
                  width: "50%",
                  color: "white",
                  textTransform: "none",
                  borderRadius: 1,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  "&:hover": {
                    backgroundColor: "#4D6F9E",
                  },
                  "&:disabled": {
                    backgroundColor: "#638FD7",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  backgroundColor: "#638FD7",
                }}
                onClick={handleSubmit}
                disabled={!maTheBaoHanh.trim() || !memoizedChecked}
              >
                Tra cứu
              </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
