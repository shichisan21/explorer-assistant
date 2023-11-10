import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Box, Button, Grid, Modal } from "@mui/material";

interface ColorPickerProps {
  initialColor: string;
  onColorChange: (color: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerProps> = ({
  initialColor,
  onColorChange,
}) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    // localStorageから履歴を読み込みます
    const savedHistory = localStorage.getItem("colorHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [currentColor, setCurrentColor] = useState<string>(initialColor);

  useEffect(() => {
    if (currentColor !== initialColor) {
      onColorChange(currentColor);
      // 新しい色を履歴に追加し、10件のみを保持します
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, currentColor].slice(-10);
        // 更新された履歴をlocalStorageに保存します
        localStorage.setItem("colorHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    }
  }, [currentColor, initialColor, onColorChange]);

  const handleColorChange = (colorResult: any) => {
    setCurrentColor(colorResult.hex);
  };

  const handleFavoriteClick = (color: string) => {
    setCurrentColor(color);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: 300, // モーダルの幅を固定にします
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // 中央寄せにします
  };

  return (
    <>
      <Button onClick={handleOpen}>色を選択</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='color-picker-modal'
        aria-describedby='color-picker-modal-description'
      >
        <Box sx={modalStyle}>
          <SketchPicker color={currentColor} onChange={handleColorChange} />
          <Box sx={{ marginTop: 2, width: "100%" }}>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item xs={12}>
                <Box>色の履歴(最後の10件):</Box>
              </Grid>
              {history.slice(0, 10).map((color, index) => (
                <Grid item xs={2.4} key={color}>
                  {" "}
                  {/* 1行に5つ表示するため、12 / 5 = 2.4 */}
                  <Box
                    sx={{
                      width: "100%", // 親のGridアイテムに合わせて幅を100%にします
                      paddingTop: "100%", // 正方形にするためにパディングトップを100%にします
                      borderRadius: "4px", // 角を丸くします
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
    </>
  );
};

export default ColorPickerModal;
