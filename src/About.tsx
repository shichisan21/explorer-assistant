/**
 * File Description Aboutページ
 */

/**
 * Import
 */
import { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, Button } from "@mui/material";

/**
 * Interface
 */
interface AboutProps {
  url: string;
}

interface ResponseData {
  message: string;
}

interface ResponseData2 {
  Hello: string;
}

/**
 * Type
 */

/**
 * Program
 */

const About = ({ url }: AboutProps) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [data2, setData2] = useState<ResponseData2 | null>(null);
  const [message, setMessage] = useState<string>("");

  const getData = () => {
    axios.get(url).then((res) => {
      setData2(res.data);
    });
  };

  const postData = async () => {
    setMessage("これはテストです。こんにちはAI。あなたのお名前は？");
    const response = await axios.post(url, { message });
    setData(response.data);
    console.log(url);
  };

  return (
    <Box>
      <Typography variant='h4' component='div' gutterBottom>
        About
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to the About page.
      </Typography>
      <Box>
        <Box>This is Axios Test</Box>
        {data ? (
          <Box>{data.message}</Box>
        ) : (
          <Button onClick={postData}>データを取得</Button>
        )}
      </Box>
      <Box>
        <Box>This is Axios Test2</Box>
        {data2 ? (
          <Box>{data2.Hello}</Box>
        ) : (
          <Button onClick={getData}>データを取得</Button>
        )}
      </Box>
    </Box>
  );
};

export default About;
