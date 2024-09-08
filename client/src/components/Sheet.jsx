import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Grid, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

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

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // fetch the data
  React.useEffect(() => {
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
          // Chuyển đổi chuỗi ngày thành đối tượng Date
          const ngayKichHoat = new Date(item.NGAY_KICH_HOAT);
          const ngayHetHan = new Date(item.NGAY_HET_HAN);

          // Định dạng ngày tháng năm
          item.NGAY_KICH_HOAT = `${ngayKichHoat.getDate()}/${
            ngayKichHoat.getMonth() + 1
          }/${ngayKichHoat.getFullYear()}`;
          item.NGAY_HET_HAN = `${ngayHetHan.getDate()}/${
            ngayHetHan.getMonth() + 1
          }/${ngayHetHan.getFullYear()}`;
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
      lg: 1,
      xl: 1,
    },
    margin: 1,
    color: "white",
    fontSize: {
      xs: "1rem",
      sm: "1rem",
      md: "1rem",
      lg: "1rem",
      xl: "1rem",
    },
    textAlign: "left",
    display: "flex", // Thêm display: 'flex' để sử dụng alignItems
    alignItems: "center", // Căn giữa theo chiều dọc
  };
  return (
    <Item
      sx={{
        minWidth: "100%",
        border: "1px solid white",
        backgroundColor: "#2973ED",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex", // Sử dụng flexbox cho Box cha
          flexDirection: "column", // Sắp xếp các phần tử con theo chiều dọc
          margin: 0,
          padding: 0,
        }}
      >
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
              xl: "2rem",
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
            display: "flex",
            width: "100%",
            flexGrow: 1, // Cho phép Box chứa Tabs và TabPanel mở rộng tối đa
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              width: {
                xs: 120,
                sm: 120,
                md: 150,
                lg: 200,
                xl: 200,
              }, // Điều chỉnh độ rộng của Tabs
            }}
          >
            {data.map((item, index) => (
              <Tab
                label={`${item.NGAY_KICH_HOAT}`}
                {...a11yProps(index)}
                key={item.AUTO_ID}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  padding: 0, // Thêm padding cho nội dung
                  margin: 0, // Thêm margin cho nội dung
                }}
              />
            ))}
          </Tabs>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Thêm overflowY: 'auto' để cuộn nội dung khi cần thiết
              margin: 0,
              padding: 0,
            }}
          >
            {data.map((item, index) => (
              <TabPanel value={value} index={index} key={index}>
                <Typography variant="h6" gutterBottom sx={tableCellStyles}>
                  {`Mã thẻ: ${item.MA_THE_BAO_HANH}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Ngày kích hoạt: ${item.NGAY_KICH_HOAT}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Thời hạn tới: ${item.NGAY_HET_HAN}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Bệnh nhân: ${item.TEN_KHACH}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Nha sĩ: ${item.NHA_SI}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Nha khoa: ${item.NHA_KHOA}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Labo: ${item.TEN_LABO}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Xuất Xứ: ${item.TEN_XUAT_XU}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Số lượng răng: ${item.SO_LUONG_RANG}`}
                </Typography>
                <Typography variant="body1" gutterBottom sx={tableCellStyles}>
                  {`Vị trí răng: ${item.VI_TRI_RANG}`}
                </Typography>
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
  );
}
