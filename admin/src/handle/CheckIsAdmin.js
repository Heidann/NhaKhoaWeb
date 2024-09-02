export const kiemTraQuyenTruyCap = (isAdmin) => {
  if (isAdmin === 1) {
    // Cho phép chuyển đến bước tiếp theo
    console.log("Bạn có quyền truy cập chức năng này.");
    return true;
    // Thực hiện các hành động chuyển hướng hoặc xử lý logic tiếp theo tại đây
  } else {
    // Hiển thị thông báo lỗi
    alert("Bạn không có quyền truy cập chức năng này.");
    return false;
    // Có thể chuyển hướng người dùng đến trang khác hoặc thực hiện các hành động khác
  }
};
