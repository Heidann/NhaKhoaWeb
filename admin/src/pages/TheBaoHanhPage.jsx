import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title.jsx";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";
import axios from "axios";
import DataTable from "../components/DataTable.jsx";
import * as XLSX from "xlsx"; // Import the XLSX library

export default function TheBaoHanhPage() {
  const navigate = useNavigate(); // điều hướng trang

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "MA_THE_BAO_HANH", label: "MÃ THẺ HÀNH" },
  ];

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/The_Bao_Hanh`, // Sử dụng VITE_API_BASE_URL
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
      console.error("Error fetching data:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
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
      return item.MA_THE_BAO_HANH.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
    });
  }, [memoizedData, searchTerm]); // Phụ thuộc vào memoizedData và searchTerm

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Thẻ Bảo Hành");
    XLSX.writeFile(workbook, "TheBaoHanh.xlsx");
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Thông Tin Thẻ Bảo Hành</Title>
            <Grid container spacing={3}>
              <Grid item xs={1} md={1} lg={1}>
                {" "}
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    onClick={() => navigate("/the-bao-hanh/them")}
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
                  placeholder="Nhập mã thẻ bao hành"
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
                  tableType="the-bao-hanh"
                />
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
    </>
  );
}
