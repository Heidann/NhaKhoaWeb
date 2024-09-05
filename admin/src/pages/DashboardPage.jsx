import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ThongKePage from "./ThongKePage";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* --- Khu vực thông tin --- */}

        <ThongKePage
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: 240,
          }}
        />

        {/* --- Khu vực button điều hướng --- */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: 240,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/khach-hang/them")}
            >
              Thêm mới khách hàng
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/nhat-ky/them")}
            >
              Thêm mới nhật ký
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/vat-lieu/them")}
            >
              Quản lý vật liệu
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/labo/them")}
            >
              Quản lý labo
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/xuat-xu/them")}
            >
              Quản lý xuất xứ
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
