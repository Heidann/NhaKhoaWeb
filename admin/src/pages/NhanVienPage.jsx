import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";

import Title from "../components/Title.jsx";
import DataTable from "../components/DataTable.jsx";

export default function NhanVienPage() {
  const navigate = useNavigate(); // điều hướng trang

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "TEN_TAI_KHOAN", label: "Tên Tài Khoản" },
    { key: "TEN_NHAN_VIEN", label: "Tên Nhân Viên" },
    { key: "SDT", label: "Số Điện Thoại" },
    { key: "TEN_CHUC_VU", label: "Tên Chức Vụ" },
  ];

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:3000/api/admin/Tai_Khoan");
    const data = await response.json();
    setData(data);
    console.log("Data fetched successfully:", data);
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
