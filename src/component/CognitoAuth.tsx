import React, { useRef, useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 3; // 最大再試行回数を定義（必要に応じて変更）
  // useRefを使用してcognitoUserインスタンスを保持
  const cognitoUserRef = useRef<CognitoUser | null>(null);

  const handleOtpAuth = () => {
    console.log("OTP auth Called", cognitoUserRef.current);
    if (cognitoUserRef.current) {
      cognitoUserRef.current.sendCustomChallengeAnswer(otp, {
        onSuccess: (session: CognitoUserSession) => {
          console.log("OTP Challenge Success");
          navigate("/About");
        },
        onFailure: (err: Error) => {
          console.error(err);
        },
        customChallenge: (challengeParameters: any) => {
          if (retryCount < MAX_RETRIES) {
            setRetryCount(retryCount + 1);
            alert(
              `OTP verification failed. Please try again. Attempt: ${
                retryCount + 1
              }/${MAX_RETRIES}`
            );
          } else {
            alert("Max retries reached. Please start over.");
            // 必要に応じてリセットや再認証フローを開始する
          }
        },
      });
    } else {
      console.error("CognitoUser is null");
    }
  };

  const handleLogIn = () => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    cognitoUserRef.current = new CognitoUser(userData);

    if (!cognitoUserRef.current) return;

    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    cognitoUserRef.current.setAuthenticationFlowType("CUSTOM_AUTH");

    cognitoUserRef.current.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        // 認証に成功した場合の処理
        navigate("/CognitoOtp"); // OTP画面へのリダイレクトなど
      },
      onFailure: (err: Error) => {
        // 認証に失敗した場合の処理
        console.error(err);
      },
      customChallenge: async (challengeParameters: any) => {
        setAuthStage("otp");
        console.log("Cognito User", cognitoUserRef.current);
        console.log("Challenge Parameter", challengeParameters);
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
              <Typography variant='h4' gutterBottom>
                Enter OTP
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder='One-Time Password'
                />
              </Box>
              <Button fullWidth variant='contained' onClick={handleOtpAuth}>
                Verify OTP
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default CognitoAuth;
