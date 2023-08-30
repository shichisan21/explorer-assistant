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
interface AboutProps {
  url: string;
}

interface ResponseData {
  message: string;
}

interface Person {
  id: number;
  name: string;
}

/**
 * Type
 */

/**
 * Program
 */

const Interval = () => {
  const oaiRequestUrl = import.meta.env.VITE_OAI_REQUEST_URL;

  const [oaiResponse, setOaiResponse] = useState<ResponseData | null>(null);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    ClientId: import.meta.env.VITE_AWS_OTP_CLIENT_ID,
  });

  const handleSignOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      // Check if user is really signed out
      if (!userPool.getCurrentUser()) {
        console.log("User successfully logged out");
        navigate("/OTPAuthLogin");
      }
    }
  };
  const obj1: Person[] = [
    {
      id: 1,
      name: "suzuki",
    },
    { id: 2, name: "tanaka" },
  ];

  const obj2: Person[] = [
    {
      id: 1,
      name: "satou",
    },
    { id: 2, name: "fujiwara" },
  ];

  const updateObj1WithObj2 = (): void => {
    obj1.forEach((obj1Item, index) => {
      const match = obj2.find((obj2Item) => obj2Item.id === obj1Item.id);
      if (match) {
        obj1[index].name = match.name;
      }
    });
  };

  console.log(obj1, obj2); // 確認のためにコンソールに出力
  // この関数を呼び出して obj1 を更新
  updateObj1WithObj2();

  console.log(obj1, obj2); // 確認のためにコンソールに出力

  const sendRequestOai = async (): Promise<void> => {
    const response = await axios.post(oaiRequestUrl, { message });
    setOaiResponse(response.data);
  };

  useEffect(() => {
    sendRequestOai();
  }, []);

  return (
    <Box>
      <Typography variant='h4' component='div' gutterBottom>
        Interval
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to the Interval page.
      </Typography>
      <Box>
        {oaiResponse ? (
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            {oaiResponse.message}
          </Box>
        ) : (
          <Typography>ここにレスポンスが表示されます。</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Interval;
