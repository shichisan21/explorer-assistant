import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";

const SupabaseTest = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get("/api/hello");
        console.log("GET successful:", response.data);
      } catch (error) {
        console.error("GET Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography>this is template</Typography>
    </Box>
  );
};

export default SupabaseTest;
