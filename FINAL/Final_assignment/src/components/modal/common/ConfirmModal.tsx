import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          position: "fixed",
          width: "30%",
          height: "auto",
          backgroundColor: "white",
          margin: "auto",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        <Typography variant="h6">Confirm Action</Typography>
        <Typography>{message}</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
