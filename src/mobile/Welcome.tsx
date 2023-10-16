/***
 * import
 */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
} from "@mui/material";
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

interface ApiData {
  userInput: string;
  openAiOutput: string;
}

/**
 * Constant
 */

/**
 * Program
 */
const Welcome: React.FC = (): JSX.Element => {
  const [data, setData] = useState<ApiData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [postData, setPostData] = useState<string[]>([]);

  useEffect(() => {
    // データをフェッチする
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hello");
        setData(response.data.items); // データをステートにセット
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
      <Typography
        variant='h4'
        component='div'
        sx={{ fontWeight: "bold", fontSize: "20px", mb: 2 }}
      >
        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </Typography>

      <Typography variant='h4' component='div' sx={{ fontSize: "20px", mb: 2 }}>
        OpenAPIに対して質問する事ができます
      </Typography>

      <TextField
        variant='outlined'
        placeholder='Type something...'
        onChange={handleInput}
        value={inputValue}
        sx={{ mb: 2 }}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={sendRequest}
        sx={{ mb: 2 }}
      >
        質問する
      </Button>

      <Typography variant='h5' component='div' gutterBottom>
        直近の2投稿
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3, width: "80%" }}>
        <List>
          {data.slice(0, 2).map((item, index) => (
            <ListItem key={index}>
              <Box>
                <Typography variant='body1'>
                  <strong>投稿文:</strong> {item.userInput}
                </Typography>
                <Typography variant='body1'>
                  <strong>AIによる回答:</strong> {item.openAiOutput}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Typography variant='h5' component='div' gutterBottom>
        今回の質問履歴
      </Typography>

      <Paper sx={{ width: "100%", minHeight: "100px" }}>
        {postData.map((data, index) => (
          <Typography variant='body2' key={index} gutterBottom>
            {data}
          </Typography>
        ))}
      </Paper>

      <Divider sx={{ height: "1px", width: "100%" }} />

      <Typography
        variant='caption'
        display='block'
        gutterBottom
        sx={{ marginTop: 2 }}
      >
        © {new Date().getFullYear()} All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Welcome;
