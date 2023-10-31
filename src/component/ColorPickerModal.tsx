// ColorPickerModal.tsx

import React, { useState, useEffect } from "react";
import { BlockPicker, SketchPicker } from "react-color";
import {
  Modal,
  Box,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface ColorPickerModalProps {
  open: boolean;
  initialColor?: string;
  onClose: (color?: string) => void;
  anchorEl: HTMLElement;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  open,
  initialColor = "#000000",
  onClose,
  anchorEl,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState<string>(initialColor);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorEl]);

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
          top: `${position.top}px`,
          left: `${position.left}px`,
          bgcolor: "white",
          padding: 4,
          borderRadius: 2,
          width: fullScreen ? "90%" : 300,
        }}
      >
        <SketchPicker color={currentColor} onChange={handleColorChange} />
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
