import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import logo from "../assets/login_desktop.png";
import { firbaseauth } from "../utils/Firbase";
import axios from "axios";
export default function Signup(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, isLoad] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firbaseauth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      if (currentUser) {
        navigate("/");
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    isLoad(true);
    try {
      await createUserWithEmailAndPassword(firbaseauth, email, password);
      setEmail("");
      setPassword("");
      setError(null);
      alert("Successfully registered!");
      setTimeout(() => {
        navigate("/");
      }, 1300);
      isLoad(false);
      axios
        .post("http://localhost:8080/saveDetails", { userName, email })
        .then((response) => {
          console.log("Username saved successfully");
        })
        .catch((error) => {
          console.error("Error saving username: ", error);
        });
    } catch (error) {
      alert(error.message);
      setTimeout(() => {
        setError(null);
      }, 1400);

      isLoad(false);
    }
  };
  return isLoading ? (
    <div>Loading...</div>
  ) : user ? (
    <div>Redirecting...</div>
  ) : (
    <Container>
      <div className="left">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="card">
          <p className="singup">Sign Up</p>
          <div className="inputBox1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="user">Email</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                props.handleNameChange(e);
              }}
            />
            <span>Username</span>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </div>
          {button ? (
            <button className="btn" disabled>
              Loading...
            </button>
          ) : (
            <button className="btn" type="submit" onClick={handleSubmit}>
              SignUp
            </button>
          )}
        </div>
        <div className="signup">
          <button className="btn" onClick={() => navigate("/Login")}>
            Login
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10vw;
  justify-content: flex-start;
  .left {
    height: 100vh;
    width: 20%;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .singup {
    font-size: 32px;
    line-height: 40px;
    font-weight: 400;
    color: rgb(0, 104, 74);
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    margin-top: 1.5em;
  }
  .card {
    margin-top: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 350px;
    width: 300px;
    flex-direction: column;
    gap: 50px;
    border-radius: 15px;
    border-radius: 8px;
  }

  .inputBox,
  .inputBox1 {
    position: relative;
    width: 250px;
  }

  .inputBox input,
  .inputBox1 input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    color: #000;
    font-size: 1em;
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
    border-bottom-left-radius: 8px;
  }

  .inputBox span,
  .inputBox1 span {
    margin-top: 5px;
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 10px;
    padding: 10px;
    pointer-events: none;
    font-size: 12px;
    color: #000;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 3px;
    border-radius: 8px;
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    transform: translateX(113px) translateY(-15px);
    font-size: 0.8em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #fff;
    border: 2px;
  }

  .inputBox1 input:valid ~ span,
  .inputBox1 input:focus ~ span {
    transform: translateX(156px) translateY(-15px);
    font-size: 0.8em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #fff;
    border: 2px;
  }

  .inputBox input:valid,
  .inputBox input:focus,
  .inputBox1 input:valid,
  .inputBox1 input:focus {
    border: 2px solid #000;
    border-radius: 8px;
  }

  .btn {
    height: 45px;
    width: 100px;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 3em;
  }

  .btn:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }
  .signup {
    position: absolute;
    top: 2%;
    right: 10%;
  }
`;
