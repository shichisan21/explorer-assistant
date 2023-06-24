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

/**
 * Type
 */

/**
 * Program
 */

const About = ({ url }: AboutProps) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [message, setMessage] = useState<string>("");

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
    </Box>
  );
};

export default About;
