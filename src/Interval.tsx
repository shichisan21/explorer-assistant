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

/**
 * Program
 */

const Interval = () => {
  const [message, setMessage] = useState<string[]>(["foo"]);

  const updateArray = (): void => {
    setMessage((prevMessage) => [...prevMessage, "bar"]);
  };

  return (
    <Box>
      <Button onClick={updateArray}>Click!!</Button>
      {message}
      <Typography variant='h4' component='div' gutterBottom>
        Interval
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to the Interval page.
      </Typography>
    </Box>
  );
};

export default Interval;
