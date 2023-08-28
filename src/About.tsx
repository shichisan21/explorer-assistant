/**
 * File Description Aboutページ
 */

/**
 * Import
 */
import { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

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

/**
 * Type
 */

/**
 * Program
 */

const About = ({ url }: AboutProps) => {
  const oaiRequestUrl = import.meta.env.VITE_OAI_REQUEST_URL;

  const [oaiResponse, setOaiResponse] = useState<ResponseData | null>(null);
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

  const sendRequestOai = async (): Promise<void> => {
    const response = await axios.post(oaiRequestUrl, { message });
    setOaiResponse(response.data);
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
        <TextField
          id='standard-basic'
          variant='standard'
          onChange={(e) => setMessage(e.target.value)}
        />
      </Box>
      <Box>
        {oaiResponse ? (
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            {oaiResponse.message}
          </Box>
        ) : (
          <Typography>ここにレスポンスが表示されます。</Typography>
        )}
      </Box>
      <Box>
        <Button onClick={sendRequestOai}>返事を取得</Button>
      </Box>
      <Box>
        <Button onClick={handleSignOut}>Logout</Button>
      </Box>
    </Box>
  );
};

export default About;
