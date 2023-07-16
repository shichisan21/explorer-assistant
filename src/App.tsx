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

  return (
    <Router>
      <Link to='/TalkPost'>TalkPost</Link>
      <Link to='/about'>About</Link>
      <Link to='/mobile/FrameView'>FrameView</Link>
      <Link to='/mobile/List'>List</Link>
      <Link to='/mobile/Welcome'>Welcome</Link>
      <Link to='/UploadCSV'>UploadCSV</Link>
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
