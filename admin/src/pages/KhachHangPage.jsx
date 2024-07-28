import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title.jsx";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";

import DataTable from "../components/DataTable.jsx";

export default function KhachHangPage() {
  const [data, setData] = useState(null);

  const columns = [
    { key: "MA_KHACH", label: "ID" },
    { key: "TEN_KHACH", label: "Tên" },
    { key: "NHA_KHOA", label: "Nha khoa" },
    { key: "TEN_BAC_SI", label: "Tên bác sĩ" },
    { key: "NGAY_KICH_HOAT", label: "Ngày kích hoạt" },
    { key: "NGAY_HET_HAN", label: "Ngày hết hạn" },
    { key: "VAT_LIEU", label: "Vật liệu" },
    { key: "LABO", label: "Labo" },
    { key: "LOAI_DIA", label: "Loại đĩa" },
    { key: "SO_LUONG_RANG", label: "Số lượng răng" },
    { key: "VI_TRI_RANG", label: "Vị trí răng" },
    { key: "THE_BAO_HANH_ID", label: "ID thẻ" },
    { key: "TAI_KHOAN_ID", label: "ID tài khoản" },
  ];

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/api/khach-hang-data");
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
                <Title>Thông Tin Khách Hàng</Title>
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
