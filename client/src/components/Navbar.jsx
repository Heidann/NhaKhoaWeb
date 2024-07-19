import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoLaboratory from "../assets/logoNhaKhoa.jpg";
import { Link } from "react-router-dom";
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "white",
          top: "0",
          left: "0",
          right: "0",
          margin: "30px auto",
          borderRadius: "10px",
          color: "black",
          fontSize: "20px",
          width: "90%",
        }}
      >
        <Toolbar sx={{}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{
              mr: 2,
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <img
              src={LogoLaboratory}
              alt="Laboratory"
              style={{ width: "50px", height: "50px" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Link to="/signin">
            <Button
              sx={{
                backgroundColor: "#202A44",
                color: "white",
                textTransform: "none",
                // hover
                "&:hover": {
                  backgroundColor: "#2973ED",
                },
                // focus
                "&:focus": {
                  backgroundColor: "#202A44",
                  outline: "none",
                },

                cursor: "pointer",
              }}
            >
              Sign In
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
