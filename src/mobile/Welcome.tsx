/***
 * import
 */
import React from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";

/***
 *Interface & Type
 */
interface ApiResponse {
  name: string;
}

/**
 * Constant
 */

/**
 * Program
 */
const Welcome: React.FC = () => {
  const getResponse = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:3000/api/hello"
      );
      alert(`data receive --> ${JSON.stringify(response.data.name)}`);
    } catch (error: unknown) {
      alert("fetch error");
    }
  };

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
      <Button onClick={getResponse}>data fetch!</Button>

      <Box sx={{ fontSize: "10px" }}>
        © {new Date().getFullYear()} All Rights Reserved
      </Box>
    </Box>
  );
};

export default Welcome;
