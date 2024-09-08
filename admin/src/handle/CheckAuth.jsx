import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

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
        const refreshToken = localStorage.getItem("refreshToken"); // Lấy refresh token từ localStorage

        const response = await fetch(
          "http://localhost:3000/api/admin/Tai_Khoan/refresh_token",
          {
            method: "POST",
            credentials: "include", // Có thể không cần thiết nữa
            headers: {
              Authorization: `Bearer ${refreshToken}`, // Gửi refresh token trong header
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Cập nhật access token mới và thời gian hết hạn trong localStorage
          localStorage.setItem("token", data.accessToken);

          setIsAuthenticated(true);
          console.log("Refresh token thành công");
        } else {
          // Xử lý lỗi khi refresh token không hợp lệ
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
