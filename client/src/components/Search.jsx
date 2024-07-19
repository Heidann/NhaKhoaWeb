import * as React from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

export default function BasicGrid() {
  const [checked, setChecked] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checked && searchValue) {
      const data = new FormData(event.currentTarget);
      console.log({
        search: data.get("search"),
      });
    } else {
      // Hiển thị thông báo lỗi nếu chưa nhập mã hoặc chưa check checkbox
      alert("Vui lòng nhập mã và đồng ý với điều khoản!");
    }
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                  id="search"
                  name="search"
                  autoComplete="search"
                  InputProps={{
                    startAdornment: <SearchIcon />,
                    style: {
                      fontWeight: "bold",
                      color: "black", // Thay đổi màu chữ thành đen
                      fontSize: 18,
                    },
                  }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Stack>
              <FormControlLabel
                control={<Checkbox value="checked" color="primary" />}
                label="Tôi đồng ý việc sử dụng các thông tin cá nhân cung cấp trên website này cho mục đích tra cứu."
                sx={{
                  display: "flex", // Sử dụng flexbox để căn chỉnh
                  alignItems: "center", // Căn chỉnh các phần tử theo chiều dọc
                  margin: "1rem 0", // Khoảng cách trên dưới
                  padding: "0.5rem", // Khoảng cách bên trong
                  borderRadius: "5px", // Bo góc
                  "& .MuiFormControlLabel-label": {
                    // Chọn phần tử label
                    fontSize: {
                      xs: "0.8rem", // Kích thước font cho màn hình nhỏ
                      sm: "0.8rem", // Kích thước font cho màn hình trung bình
                      md: "1.1rem", // Kích thước font cho màn hình lớn
                      lg: "1.2rem", // Kích thước font cho màn hình rất lớn
                    },
                  },
                }}
                checked={checked}
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
                disabled={!checked || !searchValue}
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
