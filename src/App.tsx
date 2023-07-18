/**
 * File Description エントリーページ
 */

/**
 * Import
 */

import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import About from "./About";
import Welcome from "./mobile/Welcome";
import ChatRoom from "./mobile/ChatRoom";
import SampleList from "./mobile/SampleList";
import UploadCSV from "./UploadCSV";
import TalkPost from "./component/TalkPost";
import AWSAuthenticate from "./auth/AWSAuthenticate";

function App() {
  // const url = "http://127.0.0.1:8000/message";
  // const url = "https://01-api-shichisan21.vercel.app/message";

  const url = import.meta.env.VITE_APP_API_URL
    ? import.meta.env.VITE_APP_API_URL
    : "#";

  console.log("this address", url);
  // 追加: ログインステータスを管理するステート;
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={toggleDrawer}
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Your App</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem component={Link} to='/TalkPost'>
            <ListItemText primary='TalkPost' />
          </ListItem>
          <ListItem component={Link} to='/About'>
            <ListItemText primary='About' />
          </ListItem>
          <ListItem component={Link} to='/mobile/FrameView'>
            <ListItemText primary='FrameView' />
          </ListItem>
          <ListItem component={Link} to='/mobile/List'>
            <ListItemText primary='List' />
          </ListItem>
          <ListItem component={Link} to='/mobile/Welcome'>
            <ListItemText primary='Welcome' />
          </ListItem>
          <ListItem component={Link} to='/UploadCSV'>
            <ListItemText primary='UploadCSV' />
          </ListItem>
        </List>
      </Drawer>
      <Routes>
        <Route
          path='/auth'
          element={<AWSAuthenticate setLoggedIn={setLoggedIn} />}
        />
        {loggedIn ? (
          <>
            <Route path='/TalkPost' element={<TalkPost />} />
            <Route path='/UploadCSV' element={<UploadCSV />} />
            <Route path='/about' element={<About url={url} />} />
            <Route path='/mobile/Welcome' element={<Welcome />} />
            <Route path='/mobile/List' element={<SampleList />} />
            <Route path='/mobile/Chatroom' element={<ChatRoom />} />
          </>
        ) : (
          <Route path='*' element={<Navigate to='/auth' />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
