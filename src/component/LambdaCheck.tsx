import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import useState from "react";

const LambdaCheck: React.FC = () => {
  const postToLambda = async () => {
    try {
      const response = await axios.post(
        "ENDPOINT",
        {
          lambdaTest: "これはテスト",
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
      <Button onClick={postToLambda}>PUSH TO POST</Button>
    </Box>
  );
};

export default LambdaCheck;
