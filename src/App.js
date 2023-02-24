import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";

function App() {
  const [isLoginOrSignup, setIsLoginOrSignup] = useState(false);
  const [username, setUsername] = useState('');

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };
  // const StockContext = React.createContext();

  useEffect(() => {
    const path = window.location.pathname;
    setIsLoginOrSignup(path === "/login" || path === "/GetStarted");
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoginOrSignup ? "hidden" : "auto";
  }, [isLoginOrSignup]);

  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/" element={<Main username={username}/>} />
              <Route exact path="/GetStarted" element={<Signup handleNameChange={handleNameChange}/>} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
