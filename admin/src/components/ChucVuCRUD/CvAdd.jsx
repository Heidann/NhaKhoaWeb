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

const CvAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenChucVu, setTenChucVu] = useState("");
  const [chucVuList, setChucVuList] = useState([]); // State for chức vụ list
  const [filteredChucVuList, setFilteredChucVuList] = useState([]); // State for filtered chức vụ list

  useEffect(() => {
    const fetchChucVuList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/Chuc_Vu");
        if (response.ok) {
          const data = await response.json();
          setChucVuList(data);
          setFilteredChucVuList(data); // Initialize filtered list
        } else {
          // Xử lý lỗi
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi khi lấy danh sách chức vụ!");
        }
      } catch (error) {
        // Xử lý lỗi
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi kết nối đến server!");
      }
    };
    fetchChucVuList();
  }, []);

  const handleTenChucVuChange = (event) => {
    setTenChucVu(event.target.value);
    // Filter chức vụ list based on input
    const filteredList = chucVuList.filter((chucVu) =>
      chucVu.TEN_CHUC_VU.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredChucVuList(filteredList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenChucVu) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập tên chức vụ!");
      return;
    }

    // Kiểm tra xem chức vụ đã tồn tại hay chưa
    const isChucVuExists = filteredChucVuList.some(
      (chucVu) => chucVu.TEN_CHUC_VU.toLowerCase() === tenChucVu.toLowerCase()
    );

    if (isChucVuExists) {
      setOpen(true);
      setSeverity("error");
      setMessage("Chức vụ đã tồn tại!");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/admin/Chuc_Vu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TEN_CHUC_VU: tenChucVu,
      }),
    });
    if (response.ok) {
      // Xử lý khi thêm chức vụ thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Thêm chức vụ thành công!");
      // Chuyển hướng về trang danh sách chức vụ
      navigate("/chuc-vu");
    } else {
      const errorData = await response.json(); // Lấy dữ liệu lỗi từ server
      if (errorData.code === "ER_DUP_ENTRY") {
        // Kiểm tra mã lỗi
        setOpen(true);
        setSeverity("error");
        setMessage(errorData.message); // Use errorData.message
      } else {
        setOpen(true);
        setSeverity("error");
        setMessage(errorData.message); // Use errorData.message
      }
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
          <Title>Thêm chức vụ</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên chức vụ"
                  name="TEN_CHUC_VU"
                  value={tenChucVu}
                  onChange={handleTenChucVuChange} // Use the new handler
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
                  href={`/chuc-vu`}
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
          {/* Hiển thị danh sách chức vụ */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách chức vụ đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Chức Vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredChucVuList.map((chucVu) => (
                  <TableRow key={chucVu.MA_CHUC_VU}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {chucVu.TEN_CHUC_VU}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CvAdd;
