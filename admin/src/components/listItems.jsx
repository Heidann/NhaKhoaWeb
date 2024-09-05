import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useNavigate } from "react-router-dom";

const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <>
      <React.Fragment>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/khach-hang")}>
          <ListItemIcon>
            <RecentActorsIcon />
          </ListItemIcon>
          <ListItemText primary="Khách hàng" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/nhan-vien")}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Nhân viên" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/the-bao-hanh")}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary="Thẻ bảo hành" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/chuc-vu")}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Chức vụ" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/labo")}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Labo" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/vat-lieu")}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Vật Liệu" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/xuat-xu")}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Xuất xứ" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/nhat-ky")}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Nhật ký" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

const SecondaryListItems = () => {
  const navigate = useNavigate();
  return (
    <>
      <React.Fragment>
        <ListItemButton onClick={() => navigate("/thong-ke")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Thống kê" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton component="a" href="/">
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Trang chủ" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/khach-hang">
//       <ListItemIcon>
//         <RecentActorsIcon />
//       </ListItemIcon>
//       <ListItemText primary="Khách hàng" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/nhan-vien">
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Nhân viên" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/the-bao-hanh">
//       <ListItemIcon>
//         <CreditCardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Thẻ bảo hành" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/chuc-vu">
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Chức vụ" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/labo">
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Labo" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/vat-lieu">
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Vật Liệu" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/xuat-xu">
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Xuất xứ" />
//     </ListItemButton>
//     <ListItemButton component="a" href="/nhat-ky">
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Nhật ký" />
//     </ListItemButton>
//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     {/* <ListSubheader component="div" inset>
//       Thống kê
//     </ListSubheader> */}
//     <ListItemButton component="a" href="/thong-ke">
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Thống kê" />
//     </ListItemButton>
//   </React.Fragment>
// );

export { MainListItems, SecondaryListItems };
