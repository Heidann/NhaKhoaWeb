import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title.jsx";
import Deposits from "../components/Deposits.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ThongKePage() {
  const [today, setToday] = useState({ count_today: 0 }); // Khởi tạo giá trị ban đầu
  const [month, setMonth] = useState({ count_month: 0 });
  const [quarter, setQuarter] = useState({ count_quarter: 0 });
  const [year, setYear] = useState({ count_year: 0 });

  const fetchThongKe = async (endpoint, setState) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Thong_Ke/${endpoint}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
    }
  };

  useEffect(() => {
    fetchThongKe("today", setToday);
    fetchThongKe("month", setMonth);
    fetchThongKe("quarter", setQuarter);
    fetchThongKe("year", setYear);
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
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Hôm nay</Title>
                <Deposits result={today.count_today} />{" "}
                {/* Truy cập count_today từ object today */}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Tháng hiện tại</Title>
                <Deposits result={month.count_month} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Quý hiện tại</Title>
                <Deposits result={quarter.count_quarter} />
              </Paper>
            </Grid>
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
