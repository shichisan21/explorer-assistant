import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface LambdaText {
  lambdaTest: string;
  response: string;
  result: string;
}

const LambdaCheck: React.FC = () => {
  const [lambdaText, setLambdaText] = useState<LambdaText>();
  const [lambdaGetText, setLambdaGetText] = useState<any>();
  const [error, setError] = useState(""); // エラーメッセージのためのステート

  const handleGenerateText = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomTextResult = "";
    for (let i = 0; i < length; i++) {
      randomTextResult += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomTextResult;
  };

  const postToLambda = async () => {
    const newString = handleGenerateText(10); // 10文字のランダム文字列を生成
    try {
      const response: any = await axios.post(
        import.meta.env.VITE_AWS_ENDPOINT_LAMBDA_CHECK,
        {
          lambdaTest: newString,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Upload successful:", response.data);
      setLambdaText(response.data);
    } catch (error) {
      console.error("Upload error:", error);
      setError("アップロードに失敗しました。");
    }
  };

  const getDynamoResponse = async () => {
    try {
      const response: any = await axios.get(
        import.meta.env.VITE_AWS_ENDPOINT_LAMBDA_GET
      );
      setLambdaGetText(response.data);
    } catch (error) {
      console.error("Get error:", error);
      setError("Getに失敗しました。");
    }
  };

  useEffect(() => {
    getDynamoResponse();
  }, []);

  return (
    <>
      <Box>
        <Button onClick={postToLambda}>PUSH TO POST</Button>
      </Box>
      <Typography variant='h5'>{lambdaText?.lambdaTest}</Typography>
      {error && <Typography color='error'>{error}</Typography>}
      {/* エラーメッセージの表示 */}
      <Typography>{JSON.stringify(lambdaGetText)}</Typography>
    </>
  );
};

export default LambdaCheck;
