import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, styled } from "@mui/material";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundImage:
    "linear-gradient( to bottom right,#202A44 0%, #384A77 37%,#5069AA 100%)",
  borderRadius: 15,
  filter: "brightness(1.2) opacity(0.9)",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function SheetPage() {
  const [searchParams] = useSearchParams();
  const maTheBaoHanh = searchParams.get("maTheBaoHanh");
  const navigate = useNavigate();

  const [orientation, setOrientation] = useState("vertical");
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedCard(data[newValue]);
  };

  // fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Hoa_Don/result/${maTheBaoHanh}`
        );

        if (!response.ok) {
          // Handle specific error based on status code
          if (response.status === 404) {
            throw new Error("Mã thẻ bảo hành không tồn tại.");
          } else {
            throw new Error(
              `Lỗi API: Yêu cầu thất bại với trạng thái ${response.status}`
            );
          }
        }

        const data = await response.json();

        data.forEach((item) => {
          item.NGAY_KICH_HOAT = item.NGAY_KICH_HOAT.slice(0, 10);

          item.NGAY_HET_HAN = item.NGAY_HET_HAN.slice(0, 10);
        });

        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [maTheBaoHanh]);

  // Handle orientation change events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to run only once on mount

  // Handle loading
  if (isLoading) {
    return (
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}
      >
        Loading...
      </Typography>
    );
  }

  // Handle error
  if (error) {
    return (
      <div>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "red",
          }}
        >
          {error.message} {/* Display the specific error message */}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            m: {
              xs: 1,
              sx: 1,
              sm: 2,
              md: 2,
            },
          }}
        >
          Quay lại trang chủ
        </Button>
      </div>
    );
  }
  // Handle no data found
  if (data.length === 0) {
    return (
      <>
        <Box sx={{ flexGrow: 1, mt: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={0} sm={2} md={4} lg={4} xl={6}></Grid>
            <Grid item xs={12} sm={10} md={8} lg={8} xl={6}>
              <Item
                sx={{
                  minWidth: "100%",
                  border: "1px solid white",
                  backgroundColor: "#2973ED",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Box noValidate sx={{ mt: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",
                      textOverflow: "ellipsis",
                      fontWeight: 800,
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1rem",
                        lg: "1.4rem",
                        xl: "2.3rem",
                      },
                      margin: 2,
                      padding: {
                        xs: 0,
                        sx: 1,
                        sm: 2,
                        md: 2,
                      },
                      textAlign: "center",
                      textTransform: "uppercase",
                      width: "80%",
                    }}
                  >
                    thông tin bảo hành
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        m: 1,
                        p: 1,
                        textAlign: "center",
                        textTransform: "uppercase",
                        width: "80%",
                        flexGrow: 1,
                        justifyContent: "center",
                      }}
                    >
                      Không tìm thấy thông tin bảo hành cho mã thẻ
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: "1.5rem",
                          m: 1,
                          p: 1,
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                      >
                        {" "}
                        {maTheBaoHanh}
                      </Typography>
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{
                      m: {
                        xs: 1,
                        sx: 1,
                        sm: 2,
                        md: 2,
                      },
                    }}
                  >
                    Quay lại trang chủ
                  </Button>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  // css table cell
  const tableCellStyles = {
    padding: {
      xs: 0,
      sm: 0,
      md: 1,
      lg: 2,
      xl: 2,
    },
    margin: 1,
    color: "white",
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={0} sm={2} md={4} lg={4} xl={6}></Grid>
          <Grid item xs={12} sm={10} md={8} lg={8} xl={6}>
            <Item
              sx={{
                minWidth: "100%",
                border: "1px solid white",
                backgroundColor: "#2973ED",
                margin: 0,
                padding: 0,
              }}
            >
              <Box noValidate sx={{ mt: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    textOverflow: "ellipsis",
                    fontWeight: 800,
                    fontSize: {
                      xs: "1rem",
                      sm: "1rem",
                      md: "1rem",
                      lg: "1.4rem",
                      xl: "2.3rem",
                    },
                    margin: 2,
                    padding: {
                      xs: 0,
                      sx: 1,
                      sm: 2,
                      md: 2,
                    },
                    textAlign: "center",
                    textTransform: "uppercase",
                    width: "80%",
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  thông tin bảo hành
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                  }}
                >
                  <Tabs
                    orientation={orientation} // Use the state variable
                    variant="scrollable"
                    value={value}
                    onChange={handleChange} // aria-label="Vertical tabs example"
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      width: {
                        xs: "100%",
                        sm: "150px",
                        md: "200px",
                        lg: "250px",
                        xl: "250px",
                      },
                    }}
                  >
                    {data.map((item, index) => (
                      <Tab
                        label={`${item.NGAY_KICH_HOAT}`}
                        {...a11yProps(index)}
                        key={index}
                        sx={tableCellStyles}
                      />
                    ))}
                  </Tabs>
                  {/* Hiển thị data trong TabPanel */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      padding: 0,
                      width: {
                        xs: "100%",
                        sm: "calc(100% - 150px)",
                        md: "calc(100% - 150px)",
                        lg: "calc(100% - 150px)",
                        xl: "calc(100% - 150px)",
                      },
                    }}
                  >
                    {data.map((item, index) => (
                      <TabPanel value={value} index={index} key={index}>
                        <TableContainer>
                          <Table
                            sx={{
                              width: "100%",
                              borderCollapse: "collapse",
                              color: "white",
                              tableLayout: "fixed", // Keep this
                            }}
                          >
                            <TableBody>
                              <TableRow key={item.MA_THE_BAO_HANH}>
                                <TableCell sx={tableCellStyles}>
                                  Mã thẻ
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.MA_THE_BAO_HANH}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Ngày kích hoạt
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.NGAY_KICH_HOAT}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Thời hạn tới
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.NGAY_HET_HAN}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Bệnh nhân
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.TEN_KHACH}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Nha sĩ
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.TEN_NHAN_VIEN}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Nha khoa
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.NHA_KHOA}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>Labo</TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.TEN_LABO}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Loại đĩa
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.TEN_LOAI_DIA}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Số lượng răng
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.SO_LUONG_RANG}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={tableCellStyles}>
                                  Vị trí răng
                                </TableCell>
                                <TableCell sx={tableCellStyles}>
                                  {item.VI_TRI_RANG}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </TabPanel>
                    ))}
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/")}
                  sx={{
                    m: {
                      xs: 1,
                      sx: 1,
                      sm: 2,
                      md: 2,
                    },
                  }}
                >
                  Quay lại trang chủ
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
