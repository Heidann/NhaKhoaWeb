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

const LoaiDiaAdd = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [tenLoaiDia, setTenLoaiDia] = useState(""); // State for tên loại đĩa
  const [loaiDiaList, setLoaiDiaList] = useState([]); // State for loại đĩa list
  const [filteredLoaiDiaList, setFilteredLoaiDiaList] = useState([]); // State for filtered loại đĩa list

  useEffect(() => {
    const fetchLoaiDiaList = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/Loai_Dia"
        );
        if (response.ok) {
          const data = await response.json();
          setLoaiDiaList(data);
          setFilteredLoaiDiaList(data); // Initialize filtered list
        } else {
          // Xử lý lỗi
          setOpen(true);
          setSeverity("error");
          setMessage("Lỗi khi lấy danh sách loại đĩa!");
        }
      } catch (error) {
        // Xử lý lỗi
        setOpen(true);
        setSeverity("error");
        setMessage("Lỗi kết nối đến server!");
      }
    };
    fetchLoaiDiaList();
  }, []);

  const handleTenLoaiDiaChange = (event) => {
    setTenLoaiDia(event.target.value);
    // Filter loại đĩa list based on input
    const filteredList = loaiDiaList.filter((loaiDia) =>
      loaiDia.TEN_LOAI_DIA.toLowerCase().includes(
        event.target.value.toLowerCase()
      )
    );
    setFilteredLoaiDiaList(filteredList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tenLoaiDia) {
      setOpen(true);
      setSeverity("error");
      setMessage("Vui lòng nhập tên loại đĩa!");
      return;
    }

    // Kiểm tra xem loại đĩa đã tồn tại hay chưa
    const isLoaiDiaExists = filteredLoaiDiaList.some(
      (loaiDia) =>
        loaiDia.TEN_LOAI_DIA.toLowerCase() === tenLoaiDia.toLowerCase()
    );

    if (isLoaiDiaExists) {
      setOpen(true);
      setSeverity("error");
      setMessage("Loại đĩa đã tồn tại!");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/admin/Loai_Dia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TEN_LOAI_DIA: tenLoaiDia,
      }),
    });
    if (response.ok) {
      // Xử lý khi thêm loại đĩa thành công
      setOpen(true);
      setSeverity("success");
      setMessage("Thêm loại đĩa thành công!");
      // Chuyển hướng về trang danh sách loại đĩa
      navigate("/loai-dia");
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
          <Title>Thêm loại đĩa</Title>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên loại đĩa"
                  name="TEN_LOAI_DIA"
                  value={tenLoaiDia}
                  onChange={handleTenLoaiDiaChange} // Use the new handler
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
                  href={`/loai-dia`}
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
          {/* Hiển thị danh sách loại đĩa */}
          <Box mt={2} p={2} border={1} borderRadius={2}>
            <Typography variant="body1" mt={2}>
              Danh sách loại đĩa đã tồn tại:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Loại Đĩa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLoaiDiaList.map((loaiDia) => (
                  <TableRow key={loaiDia.MA_LOAI_DIA}>
                    <TableCell
                      sx={{
                        width: "100%",
                        padding: "5px",
                        borderBottom: "1px solid rgba(224, 224, 224, 0.28)",
                      }}
                    >
                      {loaiDia.TEN_LOAI_DIA}
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

export default LoaiDiaAdd;
