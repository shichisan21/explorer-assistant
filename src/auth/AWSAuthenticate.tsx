import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
  ClientId: import.meta.env.VITE_AWS_CLIENT_ID,
});

interface AuthProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AWSAuthenticate: React.FC<AuthProps> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    // cognitoUser.authenticateUser(authDetails, {
    //   onSuccess: (result) => {
    //     const AWStoken = result.getIdToken().getJwtToken();
    //     // トークンの保存
    //     document.cookie = `token=${AWStoken}; SameSite=None; Path=/`;
    //     setLoggedIn(true);
    //   },
    //   onFailure: (err) => {
    //     console.error("Failed to authenticate", err);
    //   },
    // });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const AWStoken = result.getIdToken().getJwtToken();
        // トークンの保存
        localStorage.setItem("token", AWStoken);
        setLoggedIn(true);
      },
      onFailure: (err) => {
        console.error("Failed to authenticate", err);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        <Box sx={{ margin: 2 }}>
          <TextField
            id='username-input'
            label='Username'
            variant='outlined'
            type='text'
            value={username}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            id='password-input'
            label='Password'
            variant='outlined'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginTop: "20px" }}
          />
        </Box>
        <Box>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginTop: "20px" }}
          >
            Log in
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AWSAuthenticate;
