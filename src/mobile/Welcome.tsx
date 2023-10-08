/***
 * import
 */
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

/***
 *Interface & Type
 */
interface ApiResponse {
  name: string;
}

interface ApiPostResponse {
  status: string;
}

/**
 * Constant
 */

/**
 * Program
 */
const Welcome: React.FC = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [postData, setPostData] = useState<string[]>([]);
  const getResponse = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/hello");
      alert(`data receive --> ${JSON.stringify(response.data.name)}`);
    } catch (error: unknown) {
      alert("fetch error");
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/hello", {
        key1: inputValue,
      });
      console.log(response);

      setPostData((prev) => [...prev, inputValue]);
    } catch (error: unknown) {
      console.error(error);
      alert("fetch error");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
      <Button sx={{ margin: 2 }} onClick={getResponse}>
        data fetch!
      </Button>

      <TextField onChange={handleInput} value={inputValue}></TextField>
      <Button onClick={sendRequest}>確定</Button>

      <Button sx={{ margin: 2 }} onClick={sendRequest}>
        data post!
      </Button>

      {postData.map((data: string, index: number) => {
        return <Typography key={index}>{data}</Typography>;
      })}

      <Box sx={{ fontSize: "10px" }}>
        © {new Date().getFullYear()} All Rights Reserved
      </Box>
    </Box>
  );
};

export default Welcome;
