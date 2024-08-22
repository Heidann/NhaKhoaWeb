import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundImage:
    "linear-gradient( to bottom right,#202A44 0%, #384A77 37%,#5069AA 100%)",
  borderRadius: 15,
  filter: "brightness(1.2) opacity(0.9)",
}));

export default function ResultTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(false); // State for error handling
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const navigate = useNavigate();

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

  useEffect(() => {
    const warrantyCode = searchParams.get("maTheBaoHanh");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/Khach_Hang/result/${warrantyCode}`
        );

        if (!response.ok) {
          // Instead of throwing an error, set the error state and open the dialog
          setError(true);
          setOpenDialog(true);
          return; // Stop further execution
        }

        const data = await response.json();
        // Format dates directly in the response
        data.NGAY_KICH_HOAT = new Date(
          data.NGAY_KICH_HOAT
        ).toLocaleDateString();
        data.NGAY_HET_HAN = new Date(data.NGAY_HET_HAN).toLocaleDateString();
        setSearchResults(data);
        setError(false); // Reset error state if data is found
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true); // Set error state if data is not found
      }
    };

    if (warrantyCode) {
      fetchData();
    }
  }, [searchParams]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={0} sm={4} md={6}></Grid>
        <Grid item xs={12} sm={8} md={6}>
          {/* Dialog for error message */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Lỗi!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Không tìm thấy mã thẻ bảo hành.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Đóng</Button>
            </DialogActions>
          </Dialog>

          <Item
            sx={{
              minWidth: {
                xs: "100%",
                sm: "300px",
                md: "300px",
                lg: "400px",
                xl: "600px",
              },
              border: "1px solid white",
              backgroundColor: "#2973ED",
              margin: 0,
              padding: {
                xs: 0,
                sx: 1,
                sm: 2,
                md: 3,
              },
            }}
          >
            <Box noValidate sx={{ mt: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  textOverflow: "ellipsis",
                  fontWeight: 800,
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1.4rem",
                    xl: "2.3rem",
                  },
                  margin: 2,
                  padding: {
                    xs: 0,
                    sx: 1,
                    sm: 2,
                    md: 2,
                  },
                  textAlign: "center",
                  textTransform: "uppercase",
                  width: "80%",
                }}
              >
                thông tin bảo hành
              </Typography>

              {memoizedSearchResults ? (
                <Table sx={{}}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Mã thẻ</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {memoizedSearchResults.MA_THE_BAO_HANH}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>
                        Ngày kích hoạt
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.NGAY_KICH_HOAT}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>
                        Thời hạn tới
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.NGAY_HET_HAN}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Bệnh nhân</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.TEN_KHACH}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Bác sĩ</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.TEN_BAC_SI}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Nha Khoa</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.NHA_KHOA}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}> Labo</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.LABO}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Loại đĩa</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.LOAI_DIA}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>
                        Số lượng răng
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.SO_LUONG_RANG}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Vị trí răng</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {searchResults.VI_TRI_RANG}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: "white", textAlign: "center", margin: "10px" }}
                >
                  Không tìm thấy Mã bảo hành ...
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{
                  m: {
                    xs: 1,
                    sx: 1,
                    sm: 2,
                    md: 2,
                  },
                }}
              >
                Quay lại trang chủ
              </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
