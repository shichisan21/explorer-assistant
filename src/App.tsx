/**
 * File Description エントリーページ
 */

/**
 * Import
 */

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Welcome from "./mobile/Welcome";
import ChatRoom from "./mobile/ChatRoom";
import SampleList from "./mobile/SampleList";
import UploadCSV from "./UploadCSV";

function App() {
  // const url = "http://127.0.0.1:8000/message";
  // const url = "https://01-api-shichisan21.vercel.app/message";

  const url = import.meta.env.VITE_APP_API_URL
    ? import.meta.env.VITE_APP_API_URL
    : "#";

  console.log("address", url);

  return (
    <Router>
      <Link to='/about'>About</Link>
      <Link to='/mobile/FrameView'>FrameView</Link>
      <Link to='/mobile/List'>List</Link>
      <Link to='/mobile/Welcome'>Welcome</Link>
      <Link to='/UploadCSV'>UploadCSV</Link>

      <Routes>
        <Route path='/UploadCSV' element={<UploadCSV />} />
        <Route path='/about' element={<About url={url} />} />
        <Route path='/mobile/Welcome' element={<Welcome />} />
        <Route path='/mobile/List' element={<SampleList />} />
        <Route path='/mobile/Chatroom' element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
