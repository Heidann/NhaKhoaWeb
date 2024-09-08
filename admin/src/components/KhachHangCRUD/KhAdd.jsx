import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";

const KhAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenKhach, setTenKhach] = useState("");
  const [maTheBaoHanh, setMaTheBaoHanh] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      // Step 1: Check if maTheBaoHanh has been used
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/The_Bao_Hanh/statusCode/${maTheBaoHanh}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        // Axios automatically parses the JSON response
        const data = response.data;

        if (data[0].message === "NOT FOUND") {
          setOpen(true);
          setSeverity("error");
          setMessage("Mã thẻ bảo hành không tồn tại!");
        } else if (data[0].message === "USED") {
          setOpen(true);
          setSeverity("error");
          setMessage("Mã thẻ bảo hành đã được sử dụng!");
        } else if (data[0].message === "NOT USED") {
          setOpen(true);
          setSeverity("success");
          setMessage("Mã thẻ bảo hành có thể sử dụng!");
          handleNextStep(); // Proceed to step 2
        } else {
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi không xác định!");
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi khi kiểm tra Mã thẻ bảo hành!");
        console.error("Error checking maTheBaoHanh:", error);
      }
    }

    // INSERT DATA TO DATABASE
    else if (step === 2) {
      // Step 2: Add new customer
      if (!tenKhach) {
        setOpen(true);
        setSeverity("error");
        setMessage("Vui lòng nhập Tên Khách Hàng!");
        return;
      }

      try {
        // Get maTheBaoHanhId from maTheBaoHanh
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/The_Bao_Hanh/code/${maTheBaoHanh}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const theBaoHanhData = response.data; // Axios automatically parses JSON

        if (theBaoHanhData.length > 0) {
          const theBaoHanhId = theBaoHanhData[0].AUTO_ID;

          // Send POST request with THE_BAO_HANH_ID
          const khResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/Khach_Hang`,
            {
              TEN_KHACH: tenKhach,
              THE_BAO_HANH_ID: theBaoHanhId,
              SDT: phone,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );

          if (khResponse.status === 200) {
            // Add customer successfully, show confirmation dialog
            setShowConfirmationDialog(true);
          } else {
            setOpen(true);
            setSeverity("error");
            setMessage("Lỗi khi thêm khách hàng!");
          }
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");

        // Kiểm tra xem error.response có tồn tại không
        if (error.response) {
          // Lỗi từ server, hiển thị status và data
          console.error(
            "Server responded with:",
            error.response.status,
            error.response.data
          );
          setMessage("Lỗi server: " + error.response.data.message); // Giả sử server trả về lỗi trong error.response.data.message
        } else if (error.request) {
          // Request đã được gửi nhưng không nhận được phản hồi
          console.error("No response received:", error.request);
          setMessage("Không nhận được phản hồi từ server.");
        } else {
          // Lỗi xảy ra khi tạo request
          console.error("Error setting up request:", error.message);
          setMessage("Lỗi khi gửi yêu cầu đến server.");
        }
      }
    }
  };

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  const handleConfirmationDialogConfirm = () => {
    // Navigate to add new bill page with THE_BAO_HANH_ID
    navigate(`/nhat-ky/them`);
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
          <Title>Thêm Khách Hàng</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mã thẻ bảo hành"
                    name="maTheBaoHanh"
                    value={maTheBaoHanh}
                    onChange={(e) => setMaTheBaoHanh(e.target.value)}
                  />
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
                      onClick={() => navigate("/khach-hang")}
                    >
                      {/* icon */}
                      <KeyboardArrowLeft />
                      Quay lại
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
                      Tiếp tục
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {step === 2 && (
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mã Thẻ Bảo Hành"
                    name="MA_THE_BAO_HANH"
                    value={maTheBaoHanh}
                    onChange={(e) => setMaTheBaoHanh(e.target.value)}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên Khách Hàng"
                    name="TEN_KHACH"
                    value={tenKhach}
                    onChange={(e) => setTenKhach(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="SDT"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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
                      onClick={handlePreviousStep}
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
                      Thêm
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </form>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        open={showConfirmationDialog}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>Thêm hóa đơn mới cho khách hàng?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn thêm hóa đơn mới cho khách hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/khach-hang")} autoFocus>
            Quay lại danh sách
          </Button>
          <Button onClick={handleConfirmationDialogConfirm} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default KhAdd;
