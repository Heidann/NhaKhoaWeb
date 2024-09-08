import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* --- Khu vực thông tin --- */}

        {/* <ThongKePage
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: 240,
          }}
        /> */}

        {/* --- Khu vực button điều hướng --- */}
        <Grid item xs={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/khach-hang/them")}
            sx={{
              width: "100%",
              fontSize: 16,
              padding: "10px 20px",
              margin: "10px",
            }}
          >
            Thêm mới khách hàng
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/nhat-ky/them")}
            sx={{
              width: "100%",
              fontSize: 16,
              padding: "10px 20px",
              margin: "10px",
            }}
          >
            Thêm mới nhật ký
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/vat-lieu/them")}
            sx={{
              width: "100%",
              fontSize: 16,
              padding: "10px 20px",
              margin: "10px",
            }}
          >
            Quản lý vật liệu
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/labo/them")}
            sx={{
              width: "100%",
              fontSize: 16,
              padding: "10px 20px",
              margin: "10px",
            }}
          >
            Quản lý labo
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/xuat-xu/them")}
            sx={{
              width: "100%",
              fontSize: 16,
              padding: "10px 20px",
              margin: "10px",
            }}
          >
            Quản lý xuất xứ
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
