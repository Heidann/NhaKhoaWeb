import { useNavigate, useLocation } from "react-router-dom";

const isLoggedIn = async () => {
  // Kiểm tra xem có token trong localStorage hay không
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Gọi API endpoint được bảo vệ bởi middleware 'protect'
      const response = await fetch("http://localhost:3000/api/check_token", {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        // Token hợp lệ, người dùng đã đăng nhập
        return true;
      } else {
        // Xử lý lỗi khi token không hợp lệ (ví dụ: 401 Unauthorized)
        console.error("Token không hợp lệ");
        localStorage.removeItem("token"); // Xóa token không hợp lệ
        return false;
      }
    } catch (error) {
      console.error("Lỗi kiểm tra token:", error);
      return false;
    }
  }

  return false;
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = isLoggedIn();
  if (!isAuthenticated) {
    // Chuyển hướng đến trang đăng nhập nếu không được xác thực
    return navigate("/login", { state: { from: location }, replace: true });
  }

  // Hiển thị children nếu đã xác thực
  return children;
};

export { isLoggedIn, PrivateRoute };
