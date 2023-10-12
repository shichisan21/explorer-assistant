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

  // const obj1 = {
  //   111: 0,
  //   112: 1,
  //   222: 1,
  //   333: 2,
  //   334: 1,
  // };

  // const obj2 = {
  //   111: 0,
  //   112: 2,
  //   222: 1,
  //   333: 2,
  //   334: 2,
  // };

  // const compareObjects = (obj1: any, obj2: any) => {
  //   for (const key in obj1) {
  //     // `in`演算子はプロトタイプチェーン上のプロパティもチェックします
  //     if (key in obj2 && obj1[key] === obj2[key]) {
  //       console.log(`Matching key-value pair: key=${key}, value=${obj1[key]}`);
  //     }
  //   }
  // };

  // compareObjects(obj1, obj2);

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/hello", {
        key1: inputValue,
      });
      console.log("res", response.data);

      setPostData((prev) => [...prev, inputValue, response.data.message]);
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
