// import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="100%"
      sx={{
        mt: 10,
      }}
    >
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={12} lg={12}>
          <Box textAlign="center" sx={{}}>
            <Typography variant="h2" color={"white"} gutterBottom>
              404 - Trang không tồn tại
            </Typography>
            <Typography variant="body1" color={"white"} gutterBottom>
              Trang bạn đang tìm kiếm không tồn tại.
            </Typography>
            <Button variant="contained" component={Link} to="/">
              Trở về trang chủ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
