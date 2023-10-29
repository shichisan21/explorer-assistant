import React, { useState } from "react";
import { SketchPicker, BlockPicker } from "react-color";
import { Modal, Box, Button, Grid } from "@mui/material";

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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState<string>(initialColor);

  const handleColorChange = (colorResult: any) => {
    setCurrentColor(colorResult.hex);
  };

  const addFavorite = () => {
    if (!favorites.includes(currentColor)) {
      setFavorites([...favorites, currentColor]);
    }
  };

  const handleFavoriteClick = (color: string) => {
    setCurrentColor(color);
    onClose(color);
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
          width: 300, // モーダルの幅を300ピクセルに固定
        }}
      >
        <BlockPicker color={currentColor} onChange={handleColorChange} />
        <Button onClick={addFavorite} sx={{ marginTop: 2 }}>
          Add to Favorites
        </Button>
        <Box sx={{ marginTop: 2 }}>
          <Grid container spacing={1}>
            {favorites.map((color) => (
              <Grid item key={color}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: color,
                    cursor: "pointer",
                  }}
                  onClick={() => handleFavoriteClick(color)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ColorPickerModal;
