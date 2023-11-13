import React, { useState, useEffect, useRef } from "react";
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
  const [modalStyle, setModalStyle] = useState({});
  const buttonRef = useRef<HTMLButtonElement>(null); // ボタンへの参照を作成します
  const [history, setHistory] = useState<string[]>(() => {
    // localStorageから履歴を読み込みます
    const savedHistory = localStorage.getItem("colorHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [currentColor, setCurrentColor] = useState<string>(initialColor);

  useEffect(() => {
    onColorChange(currentColor);
  }, []); // 空の依存配列を渡しています

  const handleColorChange = (colorResult: any) => {
    setCurrentColor(colorResult.hex);
  };

  const handleHistoryClick = (color: string) => {
    setCurrentColor(color);
  };

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        transform: "translateY(5px)", // ボタンから少し下げる
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    // 履歴の先頭に色を追加し、localStorageに保存します
    const updatedHistory = [currentColor, ...history].slice(0, 10);
    localStorage.setItem("colorHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);

    // 色の変更を親コンポーネントに通知します
    onColorChange(currentColor);

    // モーダルを閉じます
    setOpen(false);
  };

  // キャンセル処理を追加
  const handleCancel = () => {
    // モーダルを閉じるだけで、何もしません
    setOpen(false);
  };

  const buttonStyle = {
    width: "100px", // ボタンの幅を固定します
    p: 1,
    "&:not(:last-child)": {
      mr: 2, // 最後のボタンでなければ右のマージンを適用します
    },
  };

  return (
    <>
      <Button ref={buttonRef} onClick={handleOpen}>
        色を選択
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='color-picker-modal'
        aria-describedby='color-picker-modal-description'
        sx={{ position: "absolute" }}
      >
        <Box
          sx={{
            ...modalStyle,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            width: 220,
          }}
        >
          <SketchPicker color={currentColor} onChange={handleColorChange} />
          <Box sx={{ marginTop: 2, width: "100%" }}>
            <Grid container spacing={1} justifyContent='center'>
              <Grid item xs={12}>
                <Box>色の履歴(最後の10件):</Box>
              </Grid>
              {history.slice(0, 10).map((color, index) => (
                <Grid item key={index} xs={2.4}>
                  <Box
                    sx={{
                      width: "100%",
                      paddingBottom: "100%",
                      borderRadius: "4px",
                      bgcolor: color,
                      cursor: "pointer",
                    }}
                    onClick={() => handleHistoryClick(color)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ marginTop: 2, width: "100%", textAlign: "center" }}>
            <Button variant='outlined' sx={buttonStyle} onClick={handleCancel}>
              キャンセル
            </Button>
            <Button
              variant='contained'
              sx={buttonStyle}
              onClick={handleConfirm}
            >
              確定
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ColorPickerModal;
