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

const KhAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenKhach, setTenKhach] = useState("");
  const [maTheBaoHanh, setMaTheBaoHanh] = useState("");
  const [phone, setPhone] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [step, setStep] = useState(1); // Track the current step
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // State for confirmation dialog

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      // Step 1: Check if SDT exists
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Khach_Hang/phone/${phone}`
        );

        if (!response.ok) {
          // SDT doesn't exist, proceed to step 2
          handleNextStep();
        } else {
          const data = await response.json();
          if (data.length > 0) {
            // SDT exists, show error message
            setOpen(true);
            setSeverity("error");
            setMessage("Số điện thoại đã tồn tại!");
          } else {
            // SDT doesn't exist, proceed to step 2
            handleNextStep();
          }
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi khi kiểm tra số điện thoại!");
        console.error("Error checking phone number:", error);
      }
    }
    // kiem tra maTheBaoHanh co ton trong database chua
    else if (step === 2) {
      // Step 2: Add new customer
      if (!tenKhach || !maTheBaoHanh || !createBy) {
        setOpen(true);
        setSeverity("error");
        setMessage("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/The_Bao_Hanh/code/${maTheBaoHanh}`
        );

        if (!response.ok) {
          // Thẻ bảo hành không tồn tại
          setOpen(true);
          setSeverity("error");
          setMessage("Mã thẻ bảo hành không tồn tại!");
          return;
        }

        const theBaoHanhData = await response.json();
        if (theBaoHanhData.length > 0) {
          const theBaoHanhId = theBaoHanhData[0].AUTO_ID;

          // Send POST request with THE_BAO_HANH_ID
          const khResponse = await fetch(
            `http://localhost:3000/api/admin/Khach_Hang`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                TEN_KHACH: tenKhach,
                THE_BAO_HANH_ID: theBaoHanhId,
                SDT: phone,
                CREATE_BY: createBy,
              }),
            }
          );

          if (khResponse.ok) {
            // Add customer successfully, show confirmation dialog
            setShowConfirmationDialog(true);
          } else {
            const errorData = await khResponse.json();
            setOpen(true);
            setSeverity("error");
            setMessage(errorData.message);
          }
        } else {
          // Thẻ bảo hành không tồn tại
          setOpen(true);
          setSeverity("error");
          setMessage("Mã thẻ bảo hành không tồn tại!");
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi khi thêm khách hàng!");
        console.error("Error adding customer:", error);
      }
    }
  };

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  const handleConfirmationDialogConfirm = () => {
    // Navigate to add new bill page with THE_BAO_HANH_ID
    navigate(`/hoa-don/add?theBaoHanhId=${maTheBaoHanh}`);
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
                    label="Số Điện Thoại"
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
                    label="Tên Khách Hàng"
                    name="TEN_KHACH"
                    value={tenKhach}
                    onChange={(e) => setTenKhach(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mã Thẻ Bảo Hành"
                    name="MA_THE_BAO_HANH"
                    value={maTheBaoHanh}
                    onChange={(e) => setMaTheBaoHanh(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Người tạo"
                    name="CREATE_BY"
                    value={createBy}
                    onChange={(e) => setCreateBy(e.target.value)}
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
