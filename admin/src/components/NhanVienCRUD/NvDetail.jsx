import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import Title from "../Title";

const NvDetail = () => {
  const { id } = useParams();
  const [dataDeTail, setDataDeTail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Tai_Khoan/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDataDeTail(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!dataDeTail) {
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
          <Avatar
            alt="Profile Picture"
            src={dataDeTail[0].HINH_ANH} // Assuming you have an image field
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Title>Chi tiết nhân viên</Title>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên nhân viên:</b> {dataDeTail[0].TEN_NHAN_VIEN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Tên tài khoản:</b> {dataDeTail[0].TEN_TAI_KHOAN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Số điện thoại:</b> {dataDeTail[0].SDT}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom sx={styleText}>
                <b>Chức vụ ID:</b> {dataDeTail[0].CHUC_VU_ID}
              </Typography>
            </Grid>
            {/* Add more fields as needed */}
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" href={`/nhan-vien/chinh-sua/${id}`}>
          Chỉnh sửa
        </Button>
      </Box>
    </Paper>
  );
};

export default NvDetail;
