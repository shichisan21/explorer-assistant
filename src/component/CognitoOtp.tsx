import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken,
} from "amazon-cognito-identity-js";

const CognitoOtp: React.FC = () => {
  const poolData = {
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  };

  const userPool = new CognitoUserPool(poolData);

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOtpLogIn = () => {
    const cognitoUserString = localStorage.getItem("cognitoUser");
    const dataString = cognitoUserString ? JSON.parse(cognitoUserString) : null;
    console.log("cognitoUser", dataString);

    const userData = {
      Username: dataString.username,
      Pool: userPool,
    };

    // 必要な情報を抽出する
    const cognitoUser = new CognitoUser(userData);

    console.log("cognitoUser", cognitoUser);

    // トークン情報を含むセッションデータを構築
    const sessionData = {
      IdToken: new CognitoIdToken(dataString.idToken),
      AccessToken: new CognitoAccessToken(dataString.accessToken),
    };
    const signInUserSession = new CognitoUserSession(sessionData);

    cognitoUser.setSignInUserSession(signInUserSession); // セッション情報を設定

    cognitoUser.sendCustomChallengeAnswer(otp, {
      onSuccess: (session) => {
        // OTP認証に成功した場合の処理
        navigate("/About");
      },
      onFailure: (err) => {
        // OTP認証に失敗した場合の処理
        console.error(err);
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
          Input Otp
        </Typography>
        <p>ワンタイムパスワードを入力してください。</p>
        <Box>
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='OneTimePassword'
            type='password'
          />
        </Box>
        <Button fullWidth variant='contained' onClick={handleOtpLogIn}>
          Otp Log IN
        </Button>
      </Paper>
    </Box>
  );
};

export default CognitoOtp;
