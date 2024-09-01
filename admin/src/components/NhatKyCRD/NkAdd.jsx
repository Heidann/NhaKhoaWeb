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

const NkAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [maTheBaoHanh, setMaTheBaoHanh] = useState("");
  const [nhaKhoa, setNhaKhoa] = useState("Laboratoryhl Đồng Nai"); // Set default value
  const [tenBacSi, setTenBacSi] = useState("");
  const [soThang, setSoThang] = useState("");
  const [laboId, setLaboId] = useState("");
  const [loaiDiaId, setLoaiDiaId] = useState("");
  const [soLuongRang, setSoLuongRang] = useState("");
  const [viTriRang, setViTriRang] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [step, setStep] = useState(1);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [nhaSiList, setNhaSiList] = useState([]);
  const [laboList, setLaboList] = useState([]);
  const [loaiDiaList, setLoaiDiaList] = useState([]);
  const [theBaoHanhId, setTheBaoHanhId] = useState(null); // Add state for THE_BAO_HANH_ID

  useEffect(() => {
    const fetchNhaSi = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Tai_Khoan/nha_si`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNhaSiList(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching nha si data:", error);
      }
    };

    const fetchLabo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/Labo`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLaboList(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching labo data:", error);
      }
    };

    const fetchLoaiDia = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Loai_Dia`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLoaiDiaList(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching loai dia data:", error);
      }
    };

    fetchNhaSi();
    fetchLabo();
    fetchLoaiDia();
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      try {
        const resMaTheBaoHanh = await fetch(
          `http://localhost:3000/api/admin/The_Bao_Hanh/code/${maTheBaoHanh}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!resMaTheBaoHanh.ok) {
          // Thẻ bảo hành không tồn tại
          setOpen(true);
          setSeverity("error");
          setMessage("Mã thẻ bảo hành không tồn tại!");
          return;
        } else {
          const theBaoHanhData = await resMaTheBaoHanh.json();
          if (theBaoHanhData.length > 0) {
            setTheBaoHanhId(theBaoHanhData[0].AUTO_ID); // Set THE_BAO_HANH_ID
            handleNextStep();
          } else {
            // Thẻ bảo hành không tồn tại
            setOpen(true);
            setSeverity("error");
            setMessage("Mã thẻ bảo hành không tồn tại!");
          }
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
        !loaiDiaId ||
        !soLuongRang ||
        !viTriRang ||
        !createBy
      ) {
        setOpen(true);
        setSeverity("error");
        setMessage("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      console.log({
        THE_BAO_HANH_ID: theBaoHanhId, // Use theBaoHanhId here
        NHA_KHOA: nhaKhoa,
        TEN_BAC_SI: tenBacSi,
        SO_THANG: soThang,

        LABO_ID: laboId,
        LOAI_DIA_ID: loaiDiaId,
        SO_LUONG_RANG: soLuongRang,
        VI_TRI_RANG: viTriRang,
        CREATE_BY: createBy,
      });

      try {
        const Nkresponse = await fetch(
          `http://localhost:3000/api/admin/Hoa_Don`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              THE_BAO_HANH_ID: theBaoHanhId, // Use theBaoHanhId here
              NHA_KHOA: nhaKhoa,
              TEN_BAC_SI: tenBacSi,
              SO_THANG: soThang,

              LABO_ID: laboId,
              LOAI_DIA_ID: loaiDiaId,
              SO_LUONG_RANG: soLuongRang,
              VI_TRI_RANG: viTriRang,
              CREATE_BY: createBy,
            }),
          }
        );

        if (Nkresponse.ok) {
          setShowConfirmationDialog(true);
        } else {
          const errorData = await Nkresponse.json();
          setOpen(true);
          setSeverity("error");
          setMessage(errorData.message);
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

  const handleConfirmationDialogConfirm = () => {
    navigate(`/hoa-don/add?theBaoHanhId=${maTheBaoHanh}`);
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nha Khoa"
                    name="NHA_KHOA"
                    value={nhaKhoa}
                    onChange={(e) => setNhaKhoa(e.target.value)}
                    disabled // Disable the field
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="ten-bac-si-label">Tên Bác Sĩ</InputLabel>
                    <Select
                      labelId="ten-bac-si-label"
                      id="ten-bac-si"
                      value={tenBacSi}
                      onChange={(e) => setTenBacSi(e.target.value)}
                    >
                      {nhaSiList.map((nhaSi) => (
                        <MenuItem key={nhaSi.AUTO_ID} value={nhaSi.AUTO_ID}>
                          {nhaSi.TEN_NHAN_VIEN}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="so-thang-label">Số Tháng</InputLabel>
                    <Select
                      labelId="so-thang-label"
                      id="so-thang"
                      value={soThang}
                      onChange={(e) => setSoThang(e.target.value)}
                    >
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={18}>18</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="labo-id-label">Labo ID</InputLabel>
                    <Select
                      labelId="labo-id-label"
                      id="labo-id"
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
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="loai-dia-id-label">Loại Dia ID</InputLabel>
                    <Select
                      labelId="loai-dia-id-label"
                      id="loai-dia-id"
                      value={loaiDiaId}
                      onChange={(e) => setLoaiDiaId(e.target.value)}
                    >
                      {loaiDiaList.map((loaiDia) => (
                        <MenuItem key={loaiDia.AUTO_ID} value={loaiDia.AUTO_ID}>
                          {loaiDia.TEN_LOAI_DIA}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số Lượng Răng"
                    name="SO_LUONG_RANG"
                    value={soLuongRang}
                    onChange={(e) => setSoLuongRang(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Vị Trí Răng"
                    name="VI_TRI_RANG"
                    value={viTriRang}
                    onChange={(e) => setViTriRang(e.target.value)}
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
          <Button onClick={() => navigate("/nhat-ky")} autoFocus>
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

export default NkAdd;
