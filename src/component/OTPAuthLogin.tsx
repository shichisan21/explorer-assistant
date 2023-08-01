import React, { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OTPAuthLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const handleSignIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Sign in success!", result);
        navigate("/About");
      },
      onFailure: (err) => {
        console.error("Failed to sign in", err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // パスワードが期限切れの場合、新しいパスワードを設定するコード
      },
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>登録したメールアドレスとパスワードを入力してください。</p>
      <p>
        ワンタイムパスワードによるログイン後にこちらでログインが可能になります。
      </p>
      <Box>
        <TextField
          sx={{ margin: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
      </Box>
      <Box>
        <TextField
          sx={{ margin: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          type='password'
        />
      </Box>
      <Button sx={{ margin: 2 }} variant='contained' onClick={handleSignIn}>
        SIGN IN
      </Button>
    </div>
  );
};

export default OTPAuthLogin;
