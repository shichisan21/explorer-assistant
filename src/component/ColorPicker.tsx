// App.tsx or any other component

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ColorPickerModal from "./ColorPickerModal";

const ColorPickerComponent: React.FC = () => {
  const [color, setColor] = useState<string>("#000000");

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
        sx={{ border: "none", cursor: "pointer" }}
      ></Box>
      <Box marginTop={2}>
        <Typography variant='h6'>Selected Color: {color}</Typography>
      </Box>
      <ColorPickerModal initialColor={color} onColorChange={setColor} />
    </Box>
  );
};

export default ColorPickerComponent;
