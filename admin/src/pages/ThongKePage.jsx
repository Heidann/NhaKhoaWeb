import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Title from "../components/Title.jsx";
import Deposits from "../components/Deposits.jsx";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function ThongKePage() {
  const [today, setToday] = useState("");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");

  const fetchToday = async () => {
    const response = await fetch(
      "http://localhost:3000/api/admin/Thong_Ke/today",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setToday(data);
    console.log("Data fetched successfully:", data);
  };
  const fetchMonth = async () => {
    const response = await fetch(
      "http://localhost:3000/api/admin/Thong_Ke/month",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setMonth(data);
    console.log("Data fetched successfully:", data);
  };
  const fetchQuarter = async () => {
    const response = await fetch(
      "http://localhost:3000/api/admin/Thong_Ke/quarter",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setQuarter(data);
    console.log("Data fetched successfully:", data);
  };
  const fetchYear = async () => {
    const response = await fetch(
      "http://localhost:3000/api/admin/Thong_Ke/year",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setYear(data);
    console.log("Data fetched successfully:", data);
  };

  useEffect(() => {
    fetchToday();
    fetchMonth();
    fetchQuarter();
    fetchYear();
  }, []);

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        <Grid item xs={12} md={12} lg={12} margin={2}>
          <Title>
            Thống kê số lượng Thẻ bảo hành đã mở theo ngày, tháng, quý, và năm
            hiện tại.
            <br />
          </Title>
          <Grid container spacing={3}>
            {/* Table */}
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Hôm nay</Title>
                <Deposits result={today.count_today} />
              </Paper>
            </Grid>
            {/* Table */}
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Tháng hiện tại</Title>
                <Deposits result={month.count_month} />
              </Paper>
            </Grid>
            {/* Table */}
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Quý hiện tại</Title>
                <Deposits result={quarter.count_quarter} />
              </Paper>
            </Grid>
            {/* Table */}
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Năm hiện tại</Title>
                <Deposits result={year.count_year} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
