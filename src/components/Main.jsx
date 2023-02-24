import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { firbaseauth } from "../utils/Firbase";
import Dashboard from "./Dashboard";
import stockContext from "../utils/Stockcontext";
import Profile from "./Profile";
import Stock from "./Stock";
import Nav from "./Nav";
import Footer from "./Footer";
import Load from "./Loader";
export default function Main(props) {
  // const { stockSymbol } = useContext(stockContext);
  const [stockDetails, setStockDetails] = useState({});
  const [stockSymbol, setStockSymbol] = useState("FB");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firbaseauth, (user) => {
      setIsLoading(false);
      if (user) {
        setUser(user);
      } else {
        setShowLoginMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signOut(firbaseauth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      alert(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading ? (
        <Load />
      ) : user ? (
        <div>
          <Nav
            onSignout={handleLogout}
            mail={user.email}
            username={props.username}
          />
          <stockContext.Provider value={{ stockSymbol, setStockSymbol }}>
            <Dashboard />
          </stockContext.Provider>
          <Footer />
        </div>
      ) : (
        <>
          {alert("Please Login To view the Trade")}
          <Load />
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  .flex {
    display: flex;
    justify-content: space-evenly;
  }
  p {
    margin: 0;
  }
`;
