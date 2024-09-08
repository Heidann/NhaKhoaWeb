import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button"; // Import Button component
import * as XLSX from "xlsx"; // Import XLSX library
import CenteredNotification from "../components/CenteredNotification";
import DataTable from "../components/DataTable";
import Title from "../components/Title";
import axios from "axios";

export default function NhatKyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const columns = [
    { key: "AUTO_ID", label: "ID hóa đơn" },
    { key: "MA_THE_BAO_HANH", label: "Mã thẻ bảo hành" },
    { key: "NGAY_KICH_HOAT", label: "Ngày kích hoạt" },
    { key: "NGAY_HET_HAN", label: "Ngày hết hạn" },
  ];

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Hoa_Don`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      response.data.forEach((item) => {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const kichHoat = new Date(item.NGAY_KICH_HOAT);
        const hetHan = new Date(item.NGAY_HET_HAN);
        // Định dạng ngày tháng năm
        item.NGAY_KICH_HOAT = `${kichHoat.getDate()}/${
          kichHoat.getMonth() + 1
        }/${kichHoat.getFullYear()}`;
        item.NGAY_HET_HAN = `${hetHan.getDate()}/${
          hetHan.getMonth() + 1
        }/${hetHan.getFullYear()}`;
      });

      setData(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      if (error.response && error.response.status === 403) {
        setNotificationOpen(true);
      } else {
        alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
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
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return memoizedData.filter((item) => {
      return item.MA_THE_BAO_HANH.toLowerCase().includes(lowerCaseSearchTerm);
    });
  }, [memoizedData, searchTerm]);

  // Hàm xuất dữ liệu ra file Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nhật Ký");
    XLSX.writeFile(workbook, "NhatKy.xlsx");
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Thông Tin Nhật Ký</Title>
            <Grid container spacing={3}>
              <Grid item xs={1} md={1} lg={1}>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    onClick={() => navigate("/nhat-ky/them")}
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
                  placeholder="Nhập mã thẻ bảo hành hoặc tên khách hàng"
                  variant="standard"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ margin: 1, width: "80%", backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
            {memoizedData ? (
              <Fragment>
                <DataTable
                  columns={columns}
                  rows={filteredData}
                  tableType="nhat-ky"
                />
                {/* Nút "Xuất Excel" */}
                <Button variant="contained" onClick={exportToExcel}>
                  Xuất Excel
                </Button>
              </Fragment>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Skeleton />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      {/* Thông báo khi không có quyền truy cập */}
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
