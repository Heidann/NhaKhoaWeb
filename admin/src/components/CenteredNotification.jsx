import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

const CenteredNotification = ({ open, onClose, message, onAfterClose }) => {
  const handleConfirm = () => {
    // Thực hiện hành động khi người dùng click "Xác nhận" (ví dụ: đóng thông báo)
    onClose();

    // Gọi hàm onAfterClose nếu có
    if (onAfterClose) {
      onAfterClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <DialogContentText sx={{ textAlign: "center" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CenteredNotification;
