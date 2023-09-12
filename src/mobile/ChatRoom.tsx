import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, List, ListItem } from "@mui/material";

const ChatRoom: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:6789");
    wsRef.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (wsRef.current) {
      wsRef.current.send(message);
      setMessage("");
    }
  };

  return (
    <Box>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message...'
      />
      <Button onClick={handleSendMessage}>Send</Button>

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
