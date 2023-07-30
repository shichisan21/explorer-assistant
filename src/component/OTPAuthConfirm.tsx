import React, { useState } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const OTPAuthConfirm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

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
    });
  };

  return (
    <div>
      <h1>Confirm Sign Up</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder='OTP'
      />
      <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
    </div>
  );
};

export default OTPAuthConfirm;
