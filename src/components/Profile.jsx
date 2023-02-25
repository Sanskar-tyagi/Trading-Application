import axios from "axios";
import { React, useState, useEffect } from "react";
import styled from "styled-components";

export default function Profile(props) {
  const [balance, setBalance] = useState(0);
  const getUserBalance = async () => {
    try {
      const response = await axios.post(
        "https://tradingapp.onrender.com/getUserBalance",
        { username: props.username }
      );
      console.log(response.data);
      setBalance(response.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserBalance();
  }, [props.username]);

  return (
    <Container>
      <div class="container">
        <div class="wrapper">
          <div class="banner-image"> </div>
          <h1> Welcome</h1>
          <p>
            {props.username} <br />
            Generate Great Revenue Earn!!!!!
          </p>
          <p>Balanece: 10000</p>
          <p>Stocks</p>
          <ul>
            <li>Apple</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 30vw;
  height: 40vw;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.25);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 38px;
  filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  p {
    margin: 10px;
  }
  .wrapper {
    p {
      margin: 0;
    }
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .banner-image {
    background-image: url(https://images.unsplash.com/photo-1641326201918-3cafc641038e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80);
    background-position: center;
    background-size: cover;
    height: 5rem;
    width: 5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.255);
  }

  h1 {
    font-family: "Righteous", sans-serif;
    color: rgba(255, 255, 255, 0.98);
    text-transform: uppercase;
    font-size: 2.4rem;
  }

  p {
    color: #fff;
    font-family: "Lato", sans-serif;
    text-align: center;
    font-size: 0.8rem;
    line-height: 150%;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;
