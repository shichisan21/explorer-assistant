import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OTPAuthRegister: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const navigate = useNavigate();
  const handleSignUp = () => {
    userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("user name is " + result?.user.getUsername());
      console.log("call result: " + result);
      navigate("/OTPAuthConfirm");
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <p>メールアドレスとパスワードを設定して下さい。</p>
      <p>入力したメールアドレスにワンタイムパスワードが送付されます。</p>
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
      <Button sx={{ margin: 2 }} variant='contained' onClick={handleSignUp}>
        SEND OTP
      </Button>
    </div>
  );
};

export default OTPAuthRegister;
