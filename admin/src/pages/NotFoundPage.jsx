// import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const NotFoundPage = () => {
  return (
    <Container maxWidth="100%" sx={{ mt: 10 }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={12} lg={3}>
          <Box
            textAlign="center"
            bgcolor={"#f5f5f5"}
            maxWidth={400}
            p={3}
            borderRadius={5}
          >
            <Typography variant="h2" gutterBottom>
              404 - Trang không tồn tại
            </Typography>
            <Typography variant="body1" gutterBottom>
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
