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

import { CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

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
  const oaiRequestUrl = import.meta.env.VITE_OAI_REQUEST_URL;

  const [data, setData] = useState<ResponseData | null>(null);
  const [data2, setData2] = useState<ResponseData2 | null>(null);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const handleSignOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      // Check if user is really signed out
      if (!userPool.getCurrentUser()) {
        console.log("User successfully logged out");
        navigate("/OTPAuthLogin");
      }
    }
  };
  const getData = () => {
    // axios.get("http://127.0.0.1:8000").then((res) => {
    axios.get("https://01-api-shichisan21.vercel.app").then((res) => {
      setData2(res.data);
    });
  };

  const postData = async () => {
    setMessage("これはテストです。こんにちはAI。あなたのお名前は？");
    const response = await axios.post(oaiRequestUrl, { message });
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
        <Button onClick={handleSignOut}>Logout</Button>
      </Box>
    </Box>
  );
};

export default About;
