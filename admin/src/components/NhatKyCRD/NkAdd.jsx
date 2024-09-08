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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";
const NkAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [maTheBaoHanh, setMaTheBaoHanh] = useState("");
  const [nhaKhoa, setNhaKhoa] = useState("Laboratoryhl Đồng Nai");
  const [tenBacSi, setTenBacSi] = useState("");
  const [soThang, setSoThang] = useState("");
  const [laboId, setLaboId] = useState("");
  const [xuatXuId, setXuatXuId] = useState("");
  const [soLuongRang, setSoLuongRang] = useState("");
  const [viTriRang, setViTriRang] = useState("");
  const [step, setStep] = useState(1);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [nhaSiList, setNhaSiList] = useState([]);
  const [laboList, setLaboList] = useState([]);
  const [xuatXuList, setXuatXuList] = useState([]);
  const [vatLieuList, setVatLieuList] = useState([]);
  const [theBaoHanhId, setTheBaoHanhId] = useState(null);
  const [vatLieuId, setVatLieuId] = useState("");

  useEffect(() => {
    const fetchNhaSi = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan/nha_si`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setNhaSiList(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching nha si data:", error);
      }
    };

    const fetchLabo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Labo`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setLaboList(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching labo data:", error);
      }
    };

    const fetchXuatXu = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Xuat_Xu`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setXuatXuList(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching xuat xu data:", error);
      }
    };

    const fetchVatLieu = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Vat_Lieu`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setVatLieuList(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching vat lieu data:", error);
      }
    };

    fetchNhaSi();
    fetchLabo();
    fetchXuatXu();
    fetchVatLieu();
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  // handle get THE_BAO_HANH_ID
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      try {
        const resMaTheBaoHanh = await axios.get(
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

        if (resMaTheBaoHanh.status === 200) {
          const theBaoHanhData = resMaTheBaoHanh.data;
          if (theBaoHanhData.length > 0) {
            setTheBaoHanhId(theBaoHanhData[0].AUTO_ID);
            handleNextStep();
          } else {
            setOpen(true);
            setSeverity("error");
            setMessage("Mã thẻ bảo hành không tồn tại!");
          }
        } else {
          throw new Error(`HTTP error! status: ${resMaTheBaoHanh.status}`);
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi khi kiểm tra mã thẻ bảo hành!");
        console.error("Error checking THE_BAO_HANH_ID:", error);
      }
    } else if (step === 2) {
      if (
        !nhaKhoa ||
        !tenBacSi ||
        !soThang ||
        !laboId ||
        !xuatXuId ||
        !soLuongRang ||
        !viTriRang
      ) {
        setOpen(true);
        setSeverity("error");
        setMessage("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      try {
        const Nkresponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/Hoa_Don`,
          {
            THE_BAO_HANH_ID: theBaoHanhId,
            NHA_KHOA: nhaKhoa,
            TEN_BAC_SI: tenBacSi,
            SO_THANG: soThang,
            VAT_LIEU_ID: vatLieuId,
            LABO_ID: laboId,
            XUAT_XU_ID: xuatXuId,
            SO_LUONG_RANG: soLuongRang,
            VI_TRI_RANG: viTriRang,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (Nkresponse.status === 200) {
          setShowConfirmationDialog(true);
        } else {
          setOpen(true);
          setSeverity("error");
          setMessage(Nkresponse.data.message);
        }
      } catch (error) {
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi khi thêm nhật ký!");
        console.error("Error adding Nhat Ky:", error);
      }
    }
  };

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  const handleConfirmationDialogConfirm = (action) => {
    setShowConfirmationDialog(false);

    if (action === "viewDetail") {
      window.open(
        `http://localhost:5174/tra-cuu?maTheBaoHanh=${maTheBaoHanh}`,
        "_blank"
      );
      navigate("/nhat-ky");
    } else {
      navigate("/nhat-ky");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
          <Title>Thêm Nhật Ký</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mã Thẻ Bảo Hành"
                    name="THE_BAO_HANH_ID"
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
                      onClick={() => navigate("/nhat-ky")}
                    >
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
                {/* ... (other fields) */}

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mã Thẻ Bảo Hành"
                    name="THE_BAO_HANH_ID"
                    value={maTheBaoHanh}
                    disabled
                  />
                </Grid>

                {/* NHA_KHOA */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nhà Khoa"
                    name="NHA_KHOA"
                    value={nhaKhoa}
                    onChange={(e) => setNhaKhoa(e.target.value)}
                  />
                </Grid>

                {/* TEN_BAC_SI (Select) */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="tenBacSi-select-label">Nha Sĩ</InputLabel>
                    <Select
                      labelId="tenBacSi-select-label"
                      id="tenBacSi-select"
                      value={tenBacSi} // Sử dụng state tenBacSi
                      onChange={(e) => setTenBacSi(e.target.value)}
                    >
                      {nhaSiList.map((nhaSi) => (
                        <MenuItem key={nhaSi.AUTO_ID} value={nhaSi.AUTO_ID}>
                          {/* Giả sử HO_TEN là trường lưu tên bác sĩ */}
                          {nhaSi.TEN_NHAN_VIEN}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* THOI_GIAN */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Thời Gian (tháng)"
                    name="THOI_GIAN"
                    value={soThang}
                    onChange={(e) => setSoThang(e.target.value)}
                  />
                </Grid>

                {/* TEN_VAT_LIEU (Autocomplete kết hợp Select) */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="vatLieu-select-label">
                      Tên Vật Liệu
                    </InputLabel>
                    <Select
                      labelId="vatLieu-select-label"
                      id="vatLieu-select"
                      value={vatLieuId}
                      onChange={(e) => setVatLieuId(e.target.value)}
                    >
                      {vatLieuList.map((vatLieu) => (
                        <MenuItem key={vatLieu.AUTO_ID} value={vatLieu.AUTO_ID}>
                          {vatLieu.TEN_VAT_LIEU}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* TEN_LABO (Select) */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="labo-select-label">Tên Labo</InputLabel>
                    <Select
                      labelId="labo-select-label"
                      id="labo-select"
                      value={laboId}
                      onChange={(e) => setLaboId(e.target.value)}
                    >
                      {laboList.map((labo) => (
                        <MenuItem key={labo.AUTO_ID} value={labo.AUTO_ID}>
                          {labo.TEN_LABO}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* TÊN_XUAT_XU (Select) */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="xuatXu-select-label">
                      Tên Xuất Xứ
                    </InputLabel>
                    <Select
                      labelId="xuatXu-select-label"
                      id="xuatXu-select"
                      value={xuatXuId}
                      onChange={(e) => setXuatXuId(e.target.value)}
                    >
                      {xuatXuList.map((xuatXu) => (
                        <MenuItem key={xuatXu.AUTO_ID} value={xuatXu.AUTO_ID}>
                          {xuatXu.TEN_XUAT_XU}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* SO_LUONG_RANG */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số Lượng Răng"
                    name="SO_LUONG_RANG"
                    value={soLuongRang}
                    onChange={(e) => setSoLuongRang(e.target.value)}
                  />
                </Grid>

                {/* VI_TRI_RANG */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Vị Trí Răng"
                    name="VI_TRI_RANG"
                    value={viTriRang}
                    onChange={(e) => setViTriRang(e.target.value)}
                  />
                </Grid>

                {/* ... (other fields) */}
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
        <DialogTitle>Thêm nhật ký thành công!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn muốn thực hiện hành động nào tiếp theo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmationDialogConfirm("backToList")}
            autoFocus
          >
            Quay lại danh sách
          </Button>
          <Button
            onClick={() => handleConfirmationDialogConfirm("viewDetail")}
            autoFocus
          >
            Xem chi tiết hóa đơn
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NkAdd;
