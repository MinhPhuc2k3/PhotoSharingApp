import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginRegister = () => {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginNameEmpty, setIsLoginNameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isLoginNameOrPasswordWrong, setIsLoginNameOrPasswordWrong] = useState(false);

  const handleLogin = (event) => {
    if (loginName !== "") {
      if (password !== "") {
        axios
          .post("http://localhost:8081/admin/login", {
            username: loginName,
            password: password
          },{withCredentials: true})
          .then((response) => {
            console.log(response.data);
            let userLink = "/users/" + response.data._id;
            setIsLoginNameEmpty(false);
            setIsPasswordEmpty(false);
            setIsLoginNameOrPasswordWrong(false);
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("userNameLogin", {firstname:response.data.firstname, lastname:response.data.lastname});
            navigate(userLink);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            setIsLoginNameEmpty(false);
            setIsPasswordEmpty(false);
            setIsLoginNameOrPasswordWrong(true);
          });
      } else {
        setIsLoginNameEmpty(false);
        setIsPasswordEmpty(true);
        setIsLoginNameOrPasswordWrong(false);
      }
    } else {
      setIsLoginNameEmpty(true);
      setIsPasswordEmpty(false);
      setIsLoginNameOrPasswordWrong(false);
    }
    event.preventDefault();
  };

  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  const handleChangeUsername = (event) => {
    setLoginName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const showEmptyMessageForLoginName = () => {
    if (isLoginNameEmpty) {
      return (
        <span style={{ color: "red" }}>
          Username cannot be empty. Please try again.
          <br />
        </span>
      );
    }
    return null;
  };

  const showEmptyMessageForPassword = () => {
    if (isPasswordEmpty) {
      return (
        <span style={{ color: "red" }}>
          Password cannot be empty. Please try again.
          <br />
        </span>
      );
    }
    return null;
  };

  const showErrorMessage = () => {
    if (isLoginNameOrPasswordWrong) {
      return (
        <span style={{ color: "red" }}>
          Username or password is not correct.
          <br />
        </span>
      );
    }
    return null;
  };

  return (
    <div style={{position:"fixed"}}>
      <h3>
        Please log in with your username and password.
        <br />
      </h3>
      If you do not have an account, please register as a new user.
      <br />
      <br />
      <label>Username: </label>
      <input type="text" value={loginName} onChange={handleChangeUsername} />
      <br />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={handleChangePassword} />
      <br />
      {showEmptyMessageForLoginName()}
      {showEmptyMessageForPassword()}
      {showErrorMessage()}
      <br />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <span> </span>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default LoginRegister;
