import React, { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OTPAuthLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const handleSignIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Sign in success!", result);
        // メール送付
        // userPool.signUp(email, password, [], [], (err, result) => {
        //   if (err) {
        //     console.error(err);
        //     return;
        //   }
        //   console.log("user name is " + result?.user.getUsername());
        //   console.log("call result: " + result);
        //   navigate("/OTPAuthConfirm");
        // });
        // navigate("/About");
      },
      onFailure: (err) => {
        console.error("Failed to sign in", err);
      },
      // newPasswordRequired: (userAttributes, requiredAttributes) => {
      // パスワードが期限切れの場合、新しいパスワードを設定するコード
      // },
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
          OTP Log In
        </Typography>
        <p>まずログインしてください。その後自動でOTPが送付されます。</p>
        <Box>
          <TextField
            fullWidth
            sx={{ marginBottom: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
        </Box>
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
        <Button fullWidth variant='contained' onClick={handleSignIn}>
          SIGN IN
        </Button>
      </Paper>
    </Box>
  );
};

export default OTPAuthLogin;
