import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firbaseauth } from "../utils/Firbase";
import login from "../assets/Login.jpg";
export default function Login() {
  const [formData, setFormData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let userCreds = await signInWithEmailAndPassword(
        firbaseauth,
        email,
        password
      );
      setUser(userCreds.user);

      if (check) {
        localStorage.setItem(
          "loginCredentials",
          JSON.stringify({ email, password })
        );
      } else {
        localStorage.removeItem("loginCredentials");
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setIsLoading(false);
  };

  // Check if login credentials are present in local storage
  const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
  if (loginCredentials) {
    handleSignIn(null, true);
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signOut(firbaseauth);
      setUser(null);
      setFormData([]);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(firbaseauth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setFormData([]);
      }
    });
  }, []);
  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <Container>
      {user ? (
        <div>
          <p>You are logged in as: {user.email}</p>
          {isLoading ? (
            <button disabled>Loading...</button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          {error && <p>{error}</p>}
        </div>
      ) : (
        <>
          <div className="image">
            {" "}
            <img src={login} alt="" />
          </div>
          <form className="form" onSubmit={handleSignIn}>
            <h3 class="text-xl font-bold text-green-600">Login to Trade</h3>

            <div className="inputBox">
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required="required"
              />
              <span className="user">Username</span>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required="required"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <span>Password</span>
            </div>
            {isLoading ? (
              <button className="btn" disabled>
                Loading...
              </button>
            ) : (
              <div className="LoginBtn">
                <button className="btn" type="submit">
                  Login!
                </button>

                <p className="text-xs text-gray-500">
                  <p className="text-blue-700 mb-2 m-0 p-0">
                    {" "}
                    Don't have an accout?
                  </p>{" "}
                  Click on the top left to Create one and Get started
                </p>
              </div>
            )}
            {error && <p>{error}</p>}
          </form>
          <div className="signup">
            <button className="btn" onClick={() => navigate("/GetStarted")}>
              SignUp
            </button>
          </div>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  overflow: hidden;
  display: flex;
  .LoginBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .signup {
    position: absolute;
    top: 2%;
    right: 10%;
  }
  .form {
    margin-top: 20vh;
    height: 60vh;
    width: 40%;
    gap: 45px;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h3 {
      font-weight: normal;
    }
    .inputBox {
      position: relative;
      width: 250px;
    }

    .inputBox input {
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

    .inputBox span {
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

    .inputBox input:valid,
    .inputBox input:focus {
      border: 2px solid #000;
      border-radius: 8px;
    }
  }

  .inputs {
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  .image {
    width: 40%;
    img {
      width: 100%;
      height: 100%;
    }
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
    margin-bottom: 1em;
  }

  .btn:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 13px;
    user-select: none;
  }

  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 2.3em;
    width: 2.3em;
    background-color: #ccc;
    border-radius: 50%;
    transition: 0.4s;
  }

  .checkmark:hover {
    box-shadow: inset 17px 17px 16px #b3b3b3, inset -17px -17px 16px #ffffff;
  }

  .container input:checked ~ .checkmark {
    box-shadow: none;
    background-color: limegreen;
    transform: rotateX(360deg);
  }

  .container input:checked ~ .checkmark:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 0.96em;
    top: 0.7em;
    width: 0.25em;
    height: 0.5em;
    border: solid white;
    border-width: 0 0.15em 0.15em 0;
    box-shadow: 0.1em 0.1em 0em 0 rgba(0, 0, 0, 0.3);
    transform: rotate(45deg);
  }
  .checkbox {
    gap: 15px;
    display: flex;
    align-items: center;
  }
`;
