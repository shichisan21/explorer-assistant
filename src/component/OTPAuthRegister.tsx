import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const OTPAuthRegister: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const handleSignUp = () => {
    userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("user name is " + result?.user.getUsername());
      console.log("call result: " + result);
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        type='password'
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default OTPAuthRegister;
