import React, { useState } from "react";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { Box, Button, TextField } from "@mui/material";

const OTPAuthVerification: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const handleConfirm = () => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(otp, true, function (err, result) {
      if (err) {
        console.error(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    });
  };

  return (
    <div>
      <h1>Confirm OTP</h1>
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='Password'
          type='password'
        />
      </Box>
      <Button sx={{ margin: 2 }} variant='contained' onClick={handleConfirm}>
        Confirm OTP
      </Button>
    </div>
  );
};

export default OTPAuthVerification;
