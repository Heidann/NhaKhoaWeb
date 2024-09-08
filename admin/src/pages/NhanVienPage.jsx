import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; // Import Button component
import * as XLSX from "xlsx"; // Import XLSX library

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";
import axios from "axios";
import Title from "../components/Title.jsx";
import DataTable from "../components/DataTable.jsx";
import CenteredNotification from "../components/CenteredNotification.jsx";

export default function NhanVienPage() {
  const navigate = useNavigate(); // điều hướng trang

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Thông báo khi không có quyền truy cập
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "TEN_TAI_KHOAN", label: "Tên Tài Khoản" },
    { key: "TEN_NHAN_VIEN", label: "Tên Nhân Viên" },
    { key: "SDT", label: "Số Điện Thoại" },
    { key: "TEN_CHUC_VU", label: "Tên Chức Vụ" },
  ];

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan`, // Sử dụng VITE_API_BASE_URL
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setNotificationOpen(true);
      } else {
        console.error("Error fetching data:", error);
        // Xử lý lỗi khác nếu cần
      }
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const memoizedData = useMemo(() => data, [data]);
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return memoizedData;
    }
    return memoizedData.filter((item) => {
      // Lọc dựa trên các trường bạn muốn tìm kiếm
      return (
        item.TEN_CHUC_VU.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.TEN_NHAN_VIEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.TEN_TAI_KHOAN.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [memoizedData, searchTerm]); // Phụ thuộc vào memoizedData và searchTerm

  // Hàm xuất dữ liệu ra file Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nhân Viên");
    XLSX.writeFile(workbook, "NhanVien.xlsx");
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Thông Tin Nhân Viên</Title>
            <Grid container spacing={3}>
              <Grid item xs={1} md={1} lg={1}>
                {" "}
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    onClick={() => navigate("/nhan-vien/them")}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Grid>
              <Grid item xs={1} md={5} lg={7}></Grid>
              <Grid item xs={10} md={6} lg={4}>
                <TextField
                  id="standard-basic"
                  label="Tìm kiếm"
                  placeholder="Nhập tên tài khoản hoặc tên nhân viên"
                  variant="standard"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ margin: 1, width: "80%", backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
            {/* Thêm input cho thanh tìm kiếm */}
            {memoizedData ? (
              <Fragment>
                <DataTable
                  columns={columns}
                  rows={filteredData}
                  tableType="nhan-vien"
                />
                {/* Nút "Xuất Excel" */}
                <Button variant="contained" onClick={exportToExcel}>
                  Xuất Excel
                </Button>
              </Fragment>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
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
    </>
  );
}
