// BackdropComponent.tsx
import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Button } from "@mui/material";

const BackdropComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (open) {
      // 3秒後にBackdropを閉じる
      timerId = setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
    return () => clearTimeout(timerId); // クリーンアップ関数
  }, [open]);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleToggle}>
        Show Backdrop
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default BackdropComponent;
