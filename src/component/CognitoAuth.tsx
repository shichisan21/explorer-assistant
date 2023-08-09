import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
  ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

const CognitoAuth: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        // 認証に成功した場合の処理
        localStorage.setItem("cognitoUser", JSON.stringify(cognitoUser));
        navigate("/CognitoOtp"); // OTP画面へのリダイレクトなど
      },
      onFailure: (err) => {
        // 認証に失敗した場合の処理
        console.error(err);
      },
      customChallenge: (challengeParameters) => {
        // カスタム認証チャレンジの処理
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant='h4' gutterBottom>
          Log In
        </Typography>
        <p>メールアドレスとパスワードを入力してください。</p>
        <p>ワンタイムパスワードが送付されます。</p>
        <Box>
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
          />
        </Box>
        <Button fullWidth variant='contained' onClick={handleLogIn}>
          Log IN
        </Button>
      </Paper>
    </Box>
  );
};

export default CognitoAuth;
