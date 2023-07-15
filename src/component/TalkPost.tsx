import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

interface Item {
  name: string;
}

const App: React.FC = () => {
  const [response, setResponse] = useState<any>(null);
  const itemToSend: Item = { name: new Date().toISOString() };

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     try {
  //       const res = await axios.post(
  //         "http://127.0.0.1:8000/put_item/",
  //         itemToSend
  //       );
  //       setResponse(res.data);
  //     } catch (error: any) {
  //       console.error("Error during request", error);
  //       setResponse(error.message);
  //     }
  //   };
  //   sendRequest();
  // }, []);

  const onClickHandler = async (): Promise<void> => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/put_item/",
        itemToSend
      );
      setResponse(res.data);
    } catch (error: any) {
      console.error("Error during request", error);
      setResponse(error.message);
    }
  };

  return (
    <Box>
      <h1>Response:</h1>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <Button onClick={onClickHandler}>Click!!</Button>
    </Box>
  );
};

export default App;
