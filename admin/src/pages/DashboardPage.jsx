import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title.jsx";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState, useEffect } from "react";
import { useMemo, Fragment } from "react";

import DataTable from "../components/DataTable.jsx";

// import DoanhThuChart from "../components/DoanhThuChart.jsx";
export default function TheBaoHanhPage() {
  const [data, setData] = useState(null);

  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "MA_THE_BAO_HANH", label: "MÃ THẺ HÀNH" },
  ];

  const fetchInfo = async () => {
    const response = await fetch(
      "http://localhost:4000/api/admin/the-bao-hanh-data"
    );
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
      <Grid container spacing={3} sx={{}}>
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
            {/* <DoanhThuChart /> */}
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
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {memoizedData ? (
              <Fragment>
                <Title>12321</Title>
                {/* <DataTable columns={columns} rows={memoizedData} /> */}
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
