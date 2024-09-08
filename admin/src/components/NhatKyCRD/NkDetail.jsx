import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid, Typography, Paper, Divider, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import Title from "../Title";
import axios from "axios";
const NkDetail = () => {
  const { id } = useParams();

  const [nkDetail, setNkDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Hoa_Don/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          response.data.forEach((item) => {
            // Chuyển đổi chuỗi ngày thành đối tượng Date
            const createAt = new Date(item.CREATE_AT);
            const kichHoat = new Date(item.NGAY_KICH_HOAT);
            const hetHan = new Date(item.NGAY_HET_HAN);

            // Định dạng ngày tháng năm
            item.CREATE_AT = `${createAt.getDate()}/${
              createAt.getMonth() + 1
            }/${createAt.getFullYear()}`;
            item.NGAY_KICH_HOAT = `${kichHoat.getDate()}/${
              kichHoat.getMonth() + 1
            }/${kichHoat.getFullYear()}`;
            item.NGAY_HET_HAN = `${hetHan.getDate()}/${
              hetHan.getMonth() + 1
            }/${hetHan.getFullYear()}`;
          });
          setNkDetail(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  // handle error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // handle loading
  if (!nkDetail) {
    return <div>Loading...</div>;
  }
  const styleText = {
    fontSize: 18,
    lineHeight: 1.4,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: "auto",
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <DeleteForeverIcon
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
          <Title>Chi tiết nhật ký</Title> {/* Update title */}
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>ID:</b> {nkDetail[0].AUTO_ID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Nha Khoa:</b> {nkDetail[0].NHA_KHOA}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Mã Thẻ Bảo Hành:</b> {nkDetail[0].MA_THE_BAO_HANH}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên Khách Hàng:</b> {nkDetail[0].TEN_KHACH}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Nha Sĩ:</b> {nkDetail[0].BAC_SI}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Ngày Kích Hoạt:</b> {nkDetail[0].NGAY_KICH_HOAT}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên Labo:</b> {nkDetail[0].TEN_LABO}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Ngày Hết Hạn:</b> {nkDetail[0].NGAY_HET_HAN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên Vật Liệu:</b> {nkDetail[0].TEN_VAT_LIEU}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Số Lượng Răng:</b> {nkDetail[0].SO_LUONG_RANG}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên Xuất Xứ:</b> {nkDetail[0].TEN_XUAT_XU}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Vị Trí Răng:</b> {nkDetail[0].VI_TRI_RANG}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Ngày Tạo:</b> {nkDetail[0].CREATE_AT}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên Nhân Viên:</b> {nkDetail[0].TEN_NHAN_VIEN}
              </Typography>
            </Grid>
          </Grid>
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
            href={`/nhat-ky`} // Update to the correct route
          >
            {/* icon */}
            <KeyboardArrowLeft />
            Quay Lại
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NkDetail;
