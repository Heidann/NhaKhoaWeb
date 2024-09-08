import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import CenteredNotification from "../CenteredNotification";
import axios from "axios";

const TbhAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [soLuongThe, setSoLuongThe] = useState("");

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!soLuongThe) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập số lượng thẻ!");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/The_Bao_Hanh`, // Sử dụng VITE_API_BASE_URL
      { SO_LUONG_THE_BAO_HANH: soLuongThe },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      setOpen(true);
      setSeverity("success");
      setMessage("Thêm thẻ bảo hành thành công!");
      navigate("/the-bao-hanh");
    } else if (response.status === 403) {
      setNotificationOpen(true);
      return;
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // handle error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <EditIcon
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
          <Title>Thêm thẻ bảo hành</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số lượng thẻ"
                  name="SO_LUONG_THE_BAO_HANH"
                  value={soLuongThe}
                  onChange={(e) => setSoLuongThe(e.target.value)}
                />
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
                  href={`/the-bao-hanh`}
                >
                  {/* icon */}
                  <KeyboardArrowLeft />
                  Quay Lại
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  sx={{
                    padding: "10px 20px",
                    width: "100%",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                  }}
                  variant="contained"
                >
                  <EditIcon />
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <CenteredNotification
        open={notificationOpen}
        onClose={handleCloseNotification}
        message={
          <h3 style={{ color: "red" }}>
            Bạn không có quyền truy cập chức năng này
          </h3>
        }
        onAfterClose={() => navigate("/")}
      />
    </Paper>
  );
};

export default TbhAdd;
