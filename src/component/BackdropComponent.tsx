// BackdropWithModalComponent.tsx
import React, { useState, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Button,
  Modal,
  Box,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const BackdropWithModalComponent: React.FC = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (openBackdrop) {
      timerId = setTimeout(() => {
        setOpenBackdrop(false);
      }, 3000);
    }
    return () => clearTimeout(timerId);
  }, [openBackdrop]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenBackdrop(true);
    setDisplayText(inputText);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  return (
    <Box>
      <Button variant='contained' color='primary' onClick={handleOpenModal}>
        Open Modal
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              placeholder='Enter text here'
              style={{ width: 200 }}
              onChange={handleTextChange}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleCloseModal}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {displayText && (
        <Typography variant='body1' sx={{ mt: 2 }}>
          {displayText}
        </Typography>
      )}
    </Box>
  );
};

export default BackdropWithModalComponent;
