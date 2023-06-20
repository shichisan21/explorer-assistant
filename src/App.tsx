// src/App.tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Welcome from "./mobile/Welcome";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Link to='/about'>About</Link>
      <Link to='/mobile/Welcome'>Welcome</Link>
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/mobile/Welcome' element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
