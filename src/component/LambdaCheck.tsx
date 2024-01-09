import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface LambdaText {
  lambdaTest: string;
  response: string;
  result: string;
}

const LambdaCheck: React.FC = () => {
  const [lambdaText, setLambdaText] = useState<LambdaText>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lambdaGetText, setLambdaGetText] = useState<any>();
  const [error, setError] = useState(""); // エラーメッセージのためのステート

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleEditClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  // データをリスト形式で表示する関数
  const renderDataTable = () => {
    if (!lambdaGetText) return <Typography>Loading...</Typography>;

    return (
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {/* 既存のカラムヘッダー */}
              {Object.keys(lambdaGetText[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>Tag</TableCell> {/* 新しい列ヘッダー */}
            </TableRow>
          </TableHead>
          <TableBody>
            {lambdaGetText.map((item: any, index: number) => (
              <TableRow key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <TableCell key={key}>{String(value)}</TableCell>
                ))}
                <TableCell>
                  <EditIcon onClick={() => handleEditClick(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderModal = () => (
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={style}>
          <Typography>ID: {selectedId}</Typography>
          <TextField></TextField>
        </Box>
      </Modal>
  );

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
      {renderModal()}
    </>
  );
};

export default LambdaCheck;
