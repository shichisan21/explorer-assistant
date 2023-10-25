import React, { useState } from "react";
import LanguageSelector from "./SelectLanguage"; // あなたのファイル構成に合わせてパスを変更してください。
import { Box, Button, Modal, Typography } from "@mui/material";

const Language: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedLangCode, setSelectedLangCode] = useState(1); // フランス語のコードを2に設定
  const currentLanguage =
    selectedLangCode === 1
      ? "Japanese"
      : selectedLangCode === 2
      ? "English"
      : "French";

  const handleLanguageChange = (langCode: number) => {
    setSelectedLangCode(langCode);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant='h4'>Language Selector App</Typography>
      <Typography variant='h6' style={{ margin: "20px 0" }}>
        Selected Language: {currentLanguage}
      </Typography>
      <Button onClick={handleOpen}>Select Language</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            padding: 2,
            boxShadow: 24,
          }}
        >
          <LanguageSelector
            onLanguageChange={handleLanguageChange}
            initialValue={
              selectedLangCode === 1
                ? "ja"
                : selectedLangCode === 2
                ? "en"
                : "fr"
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Language;
