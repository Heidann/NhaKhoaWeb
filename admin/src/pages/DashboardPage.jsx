import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title.jsx";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { TextField, Button, CircularProgress } from "@mui/material";

// import DoanhThuChart from "../components/DoanhThuChart.jsx";
export default function DashboardPage() {
  // --- State cho VatLieu ---
  const [vatLieuInput, setVatLieuInput] = useState("");
  const [addingVatLieu, setAddingVatLieu] = useState(false);
  const [addVatLieuSuccess, setAddVatLieuSuccess] = useState(null);
  const [errorMessageVatLieu, setErrorMessageVatLieu] = useState(null);
  const [vatLieuList, setVatLieuList] = useState([]);

  // --- State cho Labo ---
  const [laboInput, setLaboInput] = useState("");
  const [addingLabo, setAddingLabo] = useState(false);
  const [addLaboSuccess, setAddLaboSuccess] = useState(null);
  const [errorMessageLabo, setErrorMessageLabo] = useState(null);
  const [laboList, setLaboList] = useState([]);

  // --- State cho XuatXu ---
  const [xuatXuInput, setXuatXuInput] = useState("");
  const [addingXuatXu, setAddingXuatXu] = useState(false);
  const [addXuatXuSuccess, setAddXuatXuSuccess] = useState(null);
  const [errorMessageXuatXu, setErrorMessageXuatXu] = useState(null);
  const [xuatXuList, setXuatXuList] = useState([]);

  useEffect(() => {
    // Lấy danh sách vật liệu khi component được mount
    const fetchVatLieuList = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Vat_Lieu`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVatLieuList(data);
        } else {
          console.error("Lỗi khi lấy danh sách vật liệu");
        }
      } catch (error) {
        console.error("Error fetching vat lieu list:", error);
      }
    };
    // Lấy danh sách xuất xứ khi component được mount
    const fetchXuatXuList = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Xuat_Xu`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setXuatXuList(data);
        } else {
          console.error("Lỗi khi lấy danh sách xuất xứ");
        }
      } catch (error) {
        console.error("Error fetching xuat xu list:", error);
      }
    };
    // Lấy danh sách labo khi component được mount
    const fetchLaboList = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/Labo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLaboList(data);
        } else {
          console.error("Lỗi khi lấy danh sách Labo");
        }
      } catch (error) {
        console.error("Error fetching labo list:", error);
      }
    };

    fetchVatLieuList();
    fetchXuatXuList();
    fetchLaboList();
  }, []);

  // --- Hàm xử lý cho VatLieu ---
  const handleAddVatLieu = async () => {
    setAddingVatLieu(true);
    setAddVatLieuSuccess(null);
    setErrorMessageVatLieu(null); // Xóa thông báo lỗi cũ

    try {
      // Kiểm tra xem TENVATLIEU đã tồn tại trong danh sách hay chưa
      const vatLieuExists = vatLieuList.some(
        (vatLieu) => vatLieu.TEN_VAT_LIEU === vatLieuInput
      );

      if (vatLieuExists) {
        // TENVATLIEU đã tồn tại
        setErrorMessageVatLieu("Tên vật liệu đã tồn tại!");
        setAddingVatLieu(false);
        return; // Dừng việc thêm mới
      } else {
        // TENVATLIEU chưa tồn tại, tiếp tục thêm mới
        const response = await fetch(
          `http://localhost:3000/api/admin/Vat_Lieu`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ TEN_VAT_LIEU: vatLieuInput }),
          }
        );

        if (response.ok) {
          setVatLieuInput(""); // Xóa nội dung textfield sau khi thêm thành công
          setAddVatLieuSuccess(true);
          // Cập nhật lại danh sách vật liệu sau khi thêm mới
          const newVatLieu = await response.json();
          setVatLieuList([...vatLieuList, newVatLieu]);
        } else {
          setAddVatLieuSuccess(false);
        }
      }
    } catch (error) {
      console.error("Error adding vat lieu:", error);
      setAddVatLieuSuccess(false);
    } finally {
      setAddingVatLieu(false);
    }
  };
  // --- Hàm xử lý cho Labo ---
  const handleAddLabo = async () => {
    setAddingLabo(true);
    setAddLaboSuccess(null);
    setErrorMessageLabo(null);

    try {
      const laboExists = laboList.some((labo) => labo.TEN_LABO === laboInput);

      if (laboExists) {
        setErrorMessageLabo("Tên labo đã tồn tại!");
        setAddingLabo(false);
        return;
      } else {
        const response = await fetch(`http://localhost:3000/api/admin/Labo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ TEN_LABO: laboInput }),
        });

        if (response.ok) {
          setLaboInput("");
          setAddLaboSuccess(true);
          const newLabo = await response.json();
          setLaboList([...laboList, newLabo]);
        } else {
          setAddLaboSuccess(false);
        }
      }
    } catch (error) {
      console.error("Error adding labo:", error);
      setAddLaboSuccess(false);
    } finally {
      setAddingLabo(false);
    }
  };

  // --- Hàm xử lý cho XuatXu ---
  const handleAddXuatXu = async () => {
    setAddingXuatXu(true);
    setAddXuatXuSuccess(null);
    setErrorMessageXuatXu(null);

    try {
      // Kiểm tra xem tên xuất xứ đã tồn tại trong danh sách hay chưa
      console.log("Kiểm tra", xuatXuInput);

      const xuatXuExists = xuatXuList.some(
        (xuatXu) =>
          xuatXu.TEN_XUAT_XU.toLowerCase() === xuatXuInput.toLowerCase()
      );
      console.log("Đã kiểm tra", xuatXuExists);

      if (xuatXuExists) {
        setErrorMessageXuatXu("Tên xuất xứ đã tồn tại!");
        setAddingXuatXu(false);
        return;
      } else {
        console.log("Thêm", xuatXuInput);

        // Tên xuất xứ chưa tồn tại, tiếp tục thêm mới
        const response = await fetch(
          `http://localhost:3000/api/admin/Xuat_Xu`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ TEN_XUAT_XU: xuatXuInput }),
          }
        );

        if (response.ok) {
          setXuatXuInput("");
          setAddXuatXuSuccess(true);
          const newXuatXu = await response.json();
          setXuatXuList([...xuatXuList, newXuatXu]);
        } else {
          setAddXuatXuSuccess(false);
        }
      }
    } catch (error) {
      console.error("Error adding xuat xu:", error);
      setAddXuatXuSuccess(false);
    } finally {
      setAddingXuatXu(false);
    }
  };

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* --- Khu vực thêm VatLieu --- */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TextField
              label="Tên Vật Liệu"
              variant="outlined"
              value={vatLieuInput}
              onChange={(e) => setVatLieuInput(e.target.value)}
              error={!!errorMessageVatLieu}
              helperText={errorMessageVatLieu}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVatLieu}
              disabled={addingVatLieu}
              startIcon={addingVatLieu ? <CircularProgress size={20} /> : null}
            >
              Thêm vật liệu mới
            </Button>
            {addVatLieuSuccess === true && (
              <div style={{ color: "green" }}>Thêm vật liệu thành công!</div>
            )}
            {addVatLieuSuccess === false && (
              <div style={{ color: "red" }}>Thêm vật liệu thất bại!</div>
            )}
          </Paper>
        </Grid>

        {/* --- Khu vực thêm Labo --- */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TextField
              label="Tên Labo"
              variant="outlined"
              value={laboInput}
              onChange={(e) => setLaboInput(e.target.value)}
              error={!!errorMessageLabo}
              helperText={errorMessageLabo}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddLabo}
              disabled={addingLabo}
              startIcon={addingLabo ? <CircularProgress size={20} /> : null}
            >
              Thêm labo mới
            </Button>
            {addLaboSuccess === true && (
              <div style={{ color: "green" }}>Thêm labo thành công!</div>
            )}
            {addLaboSuccess === false && (
              <div style={{ color: "red" }}>Thêm labo thất bại!</div>
            )}
          </Paper>
        </Grid>

        {/* --- Khu vực thêm XuatXu --- */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TextField
              label="Tên Xuất Xứ"
              variant="outlined"
              value={xuatXuInput}
              onChange={(e) => setXuatXuInput(e.target.value)}
              error={!!errorMessageXuatXu}
              helperText={errorMessageXuatXu}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddXuatXu}
              disabled={addingXuatXu}
              startIcon={addingXuatXu ? <CircularProgress size={20} /> : null}
            >
              Thêm xuất xứ mới
            </Button>
            {addXuatXuSuccess === true && (
              <div style={{ color: "green" }}>Thêm xuất xứ thành công!</div>
            )}
            {addXuatXuSuccess === false && (
              <div style={{ color: "red" }}>Thêm xuất xứ thất bại!</div>
            )}
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
          ></Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12} md={12} lg={12}></Grid>
      </Grid>
    </>
  );
}
