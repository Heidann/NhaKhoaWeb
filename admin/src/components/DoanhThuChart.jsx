import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { BarChart, axisClasses } from "@mui/x-charts";

import Title from "../components/Title.jsx";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function DoanhThuChart() {
  const theme = useTheme();
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/khach-hang-data"
        );
        const data = await response.json();

        // Process data to count customers by activation date
        const processedData = {};
        data.forEach((customer) => {
          const activationDate = new Date(customer.NGAY_KICH_HOAT);
          const dateKey = `${activationDate.getFullYear()}-${(
            "0" +
            (activationDate.getMonth() + 1)
          ).slice(-2)}`;
          if (processedData[dateKey]) {
            processedData[dateKey]++;
          } else {
            processedData[dateKey] = 1;
          }
        });

        // Convert processedData to chart format
        const chartData = Object.entries(processedData).map(([date, count]) =>
          createData(date, count)
        );
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Thống kê số lượng khách hàng đã mở thẻ</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <BarChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Số lượng khách hàng",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
