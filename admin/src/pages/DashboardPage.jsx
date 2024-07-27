import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import Chart from "../components/Chart.jsx";
import Deposits from "../components/Deposits.jsx";
import Orders from "../components/Orders.jsx";
// import PieChart from "../components/PieChart.jsx";
// import GaugeChart from "../components/GaugeChart.jsx";
// import InventoryChart from "../components/InventoryChart.jsx";

export default function DashboardPage() {
  return (
    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
        {/* Inventory chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {/* <InventoryChart /> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
