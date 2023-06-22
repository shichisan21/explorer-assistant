// src/mobile/Welcome.tsx
import React from "react";
import { Box } from "@mui/material";

const ChatRoom: React.FC = () => {
  const rectangles = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "calc(100vh - 50px)",
      }}
    >
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </Box>

      {rectangles.map((num) => (
        <Box
          key={num}
          sx={{
            width: "100%",
            height: "7%",
            bgcolor: "grey.300",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          Rectangle {num}
        </Box>
      ))}

      <Box sx={{ fontSize: "10px" }}>
        © {new Date().getFullYear()} All Rights Reserved
      </Box>
    </Box>
  );
};

export default ChatRoom;
