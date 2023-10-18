// App.tsx or any other component

import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import ColorPickerModal from "./ColorPickerModal";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>("#000000");
  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);

  const handleColorSelect = (selectedColor?: string) => {
    if (selectedColor) {
      setColor(selectedColor);
    }
    setPickerOpen(false);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      padding={4}
    >
      <Box
        component='button'
        width={50}
        height={50}
        bgcolor={color}
        onClick={() => setPickerOpen(true)}
        sx={{ border: "none", cursor: "pointer" }}
      ></Box>
      <Box marginTop={2}>
        <Typography variant='h6'>Selected Color: {color}</Typography>
      </Box>
      <ColorPickerModal
        open={isPickerOpen}
        initialColor={color}
        onClose={handleColorSelect}
      />
    </Box>
  );
};

export default ColorPicker;
