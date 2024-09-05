import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import Title from "../Title";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

const VatLieuAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [tenVatLieu, setTenVatLieu] = useState("");
  const [vatLieuList, setVatLieuList] = useState([]);
  const [filteredVatLieuList, setFilteredVatLieuList] = useState([]); // State for filtered vat lieu list

  useEffect(() => {
    const fetchVatLieuList = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/Vat_Lieu",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVatLieuList(data);
        setFilteredVatLieuList(data); // Initialize filtered list
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchVatLieuList();
  }, []);

  // search vat lieu list
  const handleTenVatLieuChange = (event) => {
    setTenVatLieu(event.target.value);
    // Filter vat lieu list based on input
    const filteredList = vatLieuList.filter((vatLieu) =>
      vatLieu.TEN_VAT_LIEU.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredVatLieuList(filteredList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenVatLieu) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Vui lòng nhập tên vật liệu!");
      return;
    }

    // Kiểm tra xem vật liệu đã tồn tại hay chưa
    const isVatLieuExists = filteredVatLieuList.some(
      (vatLieu) =>
        vatLieu.TEN_VAT_LIEU.toLowerCase() === tenVatLieu.toLowerCase()
    );

    if (isVatLieuExists) {
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Vật liệu đã tồn tại!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/Vat_Lieu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ TEN_VAT_LIEU: tenVatLieu }),
      });

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm vật liệu thành công!");
        setOpenSnackbar(true);
        navigate("/vat-lieu");
      } else {
        // Xử lý lỗi từ server
        if (response.status === 403) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Bạn không có quyền truy cập chức năng này!");
        } else {
          const errorData = await response.json();
          setSnackbarSeverity("error");
          setSnackbarMessage(errorData.message);
        }
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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
          <Title>Thêm vật liệu</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên vật liệu"
                  name="TEN_VAT_LIEU"
                  value={tenVatLieu}
                  onChange={handleTenVatLieuChange} // Use the new handler
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
                  href={`/vat-lieu`}
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
          {/* Hiển thị danh sách vật liệu */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách vật liệu đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Vật Liệu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVatLieuList.map(
                  (
                    vatLieu // Use filtered list here
                  ) => (
                    <TableRow key={vatLieu.AUTO_ID}>
                      <TableCell
                        sx={{
                          width: "100%",
                          padding: "5px",
                          borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                        }}
                      >
                        {vatLieu.TEN_VAT_LIEU}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default VatLieuAdd;
