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
  // 現在の認証のステージを示す状態を追加
  const [authStage, setAuthStage] = useState("login");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  const handleLogIn = () => {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    cognitoUser.setAuthenticationFlowType("CUSTOM_AUTH");

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        // 認証に成功した場合の処理
        navigate("/CognitoOtp"); // OTP画面へのリダイレクトなど
      },
      onFailure: (err) => {
        // 認証に失敗した場合の処理
        console.error(err);
      },
      customChallenge: async (challengeParameters) => {
        setAuthStage("otp");
        const otp = prompt("input OTP", "");
        cognitoUser.sendCustomChallengeAnswer(otp, {
          onSuccess: (session: any) => {
            // 認証成功時の処理
            console.log("OTP Challenge Success");
          },
          onFailure: (err: any) => {
            // 認証失敗時の処理
            console.error(err);
          },
        });
      },
    });
  };

  return (
    <>
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
          {authStage === "login" ? (
            <>
              {/* ログインフォーム */}
              <Typography variant='h4' gutterBottom>
                Log In
              </Typography>{" "}
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
            </>
          ) : (
            <>
              {/* OTPフォーム */}
              <Typography variant='h4' gutterBottom>
                Enter OTP
              </Typography>
              {/* <Box>
                <TextField
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder='One-Time Password'
                />
              </Box>
              <Button
                fullWidth
                variant='contained'
                onClick={handleOtpChallenge}
              >
                Verify OTP
              </Button> */}
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default CognitoAuth;
