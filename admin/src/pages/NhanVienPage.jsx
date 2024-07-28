import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title.jsx";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";

import DataTable from "../components/DataTable.jsx";

export default function TheBaoHanhPage() {
  const [data, setData] = useState(null);
  // "AUTO_ID": 1,
  // "TEN_TAI_KHOAN": "admin",
  // "TEN_NHAN_VIEN": "Admin",
  // "SDT": "0123456789",
  // "MAT_KHAU": "admin123",
  // "CHUC_VU_ID": 1
  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "TEN_TAI_KHOAN", label: "Tên Tài Khoản" },
    { key: "TEN_NHAN_VIEN", label: "Tên Nhân Viên" },
    { key: "SDT", label: "Số Điện Thoại" },
    { key: "MAT_KHAU", label: "Mật Khẩu" },
    { key: "CHUC_VU_ID", label: "ID Chức Vụ" },
  ];

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/api/nhan-vien-data");
    const data = await response.json();
    setData(data);
    console.log("Data fetched successfully:", data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            {/* <Chart /> */}
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Title>Đã kích hoạt</Title>
            <Gauge
              value={75}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {memoizedData ? (
              <Fragment>
                <Title>Thông Tin Nhân Viên</Title>
                <DataTable columns={columns} rows={memoizedData} />
              </Fragment>
            ) : (
              <p>Loading data...</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
