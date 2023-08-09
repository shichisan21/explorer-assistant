import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const CognitoOtp: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOtpLogIn = () => {
    const cognitoUserData = localStorage.getItem("cognitoUser");
    if (cognitoUserData) {
      const userData = JSON.parse(cognitoUserData);

      // CognitoUserインスタンスを再作成
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.sendCustomChallengeAnswer(otp, {
        onSuccess: (session) => {
          // OTP認証に成功した場合の処理
          navigate("/About"); // 例: ダッシュボードへリダイレクト
        },
        onFailure: (err) => {
          // OTP認証に失敗した場合の処理
          console.error(err);
        },
      });
    }
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
