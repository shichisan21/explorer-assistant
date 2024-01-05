import { Box, Button, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
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

  // データをリスト形式で表示する関数
  const renderDataTable = () => {
    if (!lambdaGetText) return <Typography>Loading...</Typography>;

    return (
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {/* カラムヘッダーの生成 */}
              {Object.keys(lambdaGetText[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lambdaGetText.map((item: any, index: number) => (
              <TableRow key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <TableCell key={key}>{String(value)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

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
    console.log("post");
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

  const putToLambda = async () => {
    const newString = handleGenerateText(10); // 10文字のランダム文字列を生成
    console.log("put");
    try {
      const response: any = await axios.put(
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
      console.log("put successful:", response.data);
      // setLambdaText(response.data);
    } catch (error) {
      console.error("Put error:", error);
      setError("更新に失敗しました。");
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
      <Box>
        <Button onClick={putToLambda}>PUT TO POST</Button>
      </Box>
      <Typography variant='h5'>{lambdaText?.lambdaTest}</Typography>
      {error && <Typography color='error'>{error}</Typography>}
      {/* エラーメッセージの表示 */}
      <Box>
        <Typography variant='h6'>GETリクエストの結果：</Typography>
        {renderDataTable()}
      </Box>
    </>
  );
};

export default LambdaCheck;
