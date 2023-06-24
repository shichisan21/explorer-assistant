import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Welcome from "./mobile/Welcome";
import ChatRoom from "./mobile/ChatRoom";

function App() {
  // const url = "http://127.0.0.1:8000/message";
  // const url = "https://01-api-shichisan21.vercel.app/message";
  const url = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "#";
  return (
    <Router>
      <Link to='/about'>About</Link>
      <Link to='/mobile/Welcome'>Welcome</Link>
      <Routes>
        <Route path='/about' element={<About url={url} />} />
        <Route path='/mobile/Welcome' element={<Welcome />} />
        <Route path='/mobile/Chatroom' element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
