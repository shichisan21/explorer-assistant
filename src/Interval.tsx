/**
 * File Description Aboutページ
 */

/**
 * Import
 */
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

import { CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

/**
 * Interface
 */

/**
 * Type
 */
interface Message {
  id: number;
  name: string;
}

/**
 * Program
 */

const Interval = () => {
  const [isAuth, setIsAuth] = useState<boolean>();
  const [message, setMessage] = useState<Message[]>([
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Doe",
    },
  ]);

  const updateArray = (): void => {
    setMessage((prevMessage) =>
      prevMessage.map((obj) =>
        obj.id === 2 ? { id: obj.id, name: "Joseph" } : obj
      )
    );
  };

  const onAuthHandle = (): void => {
    setIsAuth(true);
  };

  const onLogout = (): void => {
    setIsAuth(false);
  };

  return (
    <>
      {isAuth ? (
        <>
          <Box>
            <Button onClick={updateArray}>Click!!</Button>
            {message &&
              message.map((d: Message) => {
                return (
                  <>
                    <Typography>{d.id}</Typography>
                    <Typography>{d.name}</Typography>
                  </>
                );
              })}
            <Typography variant='h4' component='div' gutterBottom>
              Interval
            </Typography>
            <Typography variant='body1' gutterBottom>
              Welcome to the Interval page.
            </Typography>
          </Box>
          <Button onClick={onLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Typography>not Authenticated</Typography>
          <Button onClick={onAuthHandle}>Click and Auth</Button>
        </>
      )}
    </>
  );
};

export default Interval;
