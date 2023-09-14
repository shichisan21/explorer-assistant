import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, List, ListItem } from "@mui/material";

const ChatRoom: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:6789");
    wsRef.current.onopen = () => {
      console.log("WebSocket is connected.");
    };
    wsRef.current.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    wsRef.current.onclose = (event) => {
      console.log("WebSocket is closed.", event.reason);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket encountered error:", error);
    };
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    console.log("WebSocket readyState:", wsRef.current?.readyState);
    if (wsRef.current) {
      wsRef.current.send(message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message...'
      />
      <Button
        variant='contained'
        sx={{
          margin: 2,
          backgroundColor: "green", // 緑色を背景として追加
          "&:hover": {
            backgroundColor: "darkgreen", // ホバー時の色も少し暗くする
          },
          "&:focus": {
            // フォーカス時のスタイルを定義
            outline: "none", // アウトラインを削除
            boxShadow: "none", // シャドウを削除
          },
        }}
        onClick={handleSendMessage}
      >
        Send
      </Button>

      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>

      <Box sx={{ fontSize: "10px", marginTop: "20px" }}>
        © {new Date().getFullYear()} All Rights Reserved
      </Box>
    </Box>
  );
};

export default ChatRoom;
