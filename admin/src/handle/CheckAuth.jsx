import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Giải mã token để lấy thời gian hết hạn
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const tokenExpiration = decodedToken.exp * 1000;

        if (Date.now() >= tokenExpiration) {
          // Token đã hết hạn, thử refresh token
          await refreshToken();
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error);
        setIsAuthenticated(false);
      }
    };

    const refreshToken = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/Tai_Khoan/refresh_token`, // Sử dụng VITE_API_BASE_URL
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.accessToken);
          setIsAuthenticated(true);
          console.log("Refresh token thành công");
        } else {
          console.error("Refresh token không hợp lệ");
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Lỗi khi refresh token:", error);
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    // Đang kiểm tra token, hiển thị loading...
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
