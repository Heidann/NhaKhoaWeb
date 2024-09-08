import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button"; // Import Button component
import * as XLSX from "xlsx"; // Import XLSX library
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";
import Title from "../components/Title.jsx";
import DataTable from "../components/DataTable.jsx";

export default function VatLieuPage() {
  const navigate = useNavigate(); // điều hướng trang

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "TEN_VAT_LIEU", label: "Tên Vật Liệu" },
  ];

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Vat_Lieu`, // Sử dụng VITE_API_BASE_URL
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

  // Cải thiện filteredData
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return memoizedData;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return memoizedData.filter((item) => {
      return (
        // item.AUTO_ID.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.TEN_VAT_LIEU.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [memoizedData, searchTerm]); // Phụ thuộc vào memoizedData và searchTerm

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vật Liệu");
    XLSX.writeFile(workbook, "VatLieu.xlsx");
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Thông Tin Vật Liệu</Title>
            <Grid container spacing={3}>
              <Grid item xs={1} md={1} lg={1}>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    onClick={() => navigate("/vat-lieu/them")}
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
                  placeholder="Nhập tên vật liệu"
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
                  tableType="vat-lieu"
                />
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
    </>
  );
}
