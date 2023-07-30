import React, { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

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
      <button onClick={handleConfirm}>Confirm OTP</button>
    </div>
  );
};

export default OTPAuthVerification;
