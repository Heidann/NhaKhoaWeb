import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";
import Title from "../components/Title.jsx";
import DataTable from "../components/DataTable.jsx";

export default function XuatXuPage() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "TEN_XUAT_XU", label: "Xuất Xứ" },
  ];

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:3000/api/admin/Xuat_Xu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setData(data);
    console.log("Data fetched successfully:", data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  // Chỉnh sửa filteredData
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return memoizedData;
    }
    return memoizedData.filter((item) => {
      // Chú ý: Thay 'TEN_XUAT_XU' bằng tên trường muốn tìm kiếm trong dữ liệu xuất xứ
      return item.TEN_XUAT_XU.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [memoizedData, searchTerm]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Xuất xứ");
    XLSX.writeFile(workbook, "XuatXu.xlsx");
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Thông Tin Xuất Xứ</Title>
            <Grid container spacing={3}>
              <Grid item xs={1} md={1} lg={1}>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    onClick={() => navigate("/xuat-xu/them")}
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
                  placeholder="Nhập tên xuất xứ"
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
                  tableType="xuat-xu"
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
