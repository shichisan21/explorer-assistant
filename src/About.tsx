/**
 * File Description Aboutページ
 */

/**
 * Import
 */
import React, { useState } from "react";
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

  const GetData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
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
          <Box>{data.Hello}</Box>
        ) : (
          <Button onClick={GetData}>データを取得</Button>
        )}
      </Box>
    </Box>
  );
};

export default About;
