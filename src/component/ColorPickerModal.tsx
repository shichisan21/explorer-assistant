// ColorPickerModal.tsx

import React from "react";
import { SketchPicker } from "react-color";
import { Modal, Box } from "@mui/material";

interface ColorPickerModalProps {
  open: boolean;
  initialColor?: string;
  onClose: (color?: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  open,
  initialColor = "#000000",
  onClose,
}) => {
  const handleColorChange = (colorResult: any) => {
    onClose(colorResult.hex);
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <SketchPicker color={initialColor} onChange={handleColorChange} />
      </Box>
    </Modal>
  );
};

export default ColorPickerModal;
