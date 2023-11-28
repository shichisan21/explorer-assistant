import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import useState from "react";

export const LambdaCheck = async () => {
  const postToAxios = async () => {
    try {
      const response = await axios.post(
        "ENDPOINT ADDRESS",
        {
          /* Your JSON data here */
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <Box>
      <Button></Button>
    </Box>
  );
};
