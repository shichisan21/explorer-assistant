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

// // App.tsx or any other component

// import React, { useState, useRef } from "react";
// import { Box, Typography } from "@mui/material";
// import ColorPickerModal from "./ColorPickerModal";

// const ColorPicker: React.FC = () => {
//   const [color, setColor] = useState<string>("#000000");
//   const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
//   const colorBoxRef = useRef<HTMLDivElement | null>(null);

//   const handleColorSelect = (selectedColor?: string) => {
//     if (selectedColor) {
//       setColor(selectedColor);
//     }
//     setPickerOpen(false);
//   };

//   return (
//     <Box
//       display='flex'
//       flexDirection='column'
//       alignItems='center'
//       justifyContent='center'
//       padding={4}
//     >
//       <Box
//         ref={colorBoxRef}
//         component='button'
//         width={50}
//         height={50}
//         bgcolor={color}
//         onClick={() => setPickerOpen(true)}
//         sx={{ border: "none", cursor: "pointer" }}
//       ></Box>
//       <Box marginTop={2}>
//         <Typography variant='h6'>Selected Color: {color}</Typography>
//       </Box>
//       {colorBoxRef.current && (
//         <ColorPickerModal
//           open={isPickerOpen}
//           initialColor={color}
//           onClose={handleColorSelect}
//           anchorEl={colorBoxRef.current}
//         />
//       )}
//     </Box>
//   );
// };

// export default ColorPicker;
