import React, { useState } from "react";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OTPAuthConfirm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  const handleConfirmSignUp = () => {
    cognitoUser.confirmRegistration(otp, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
      navigate("/OTPAuthLogin");
    });
  };

  return (
    <div>
      <h1>Confirm OTP</h1>
      <p>
        登録したメールアドレスと受信したワンタイムパスワードを入力してください。
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='Password'
          type='password'
        />
      </Box>
      <Button
        sx={{ margin: 2 }}
        variant='contained'
        onClick={handleConfirmSignUp}
      >
        Confirm OTP
      </Button>
    </div>
  );
};

export default OTPAuthConfirm;
