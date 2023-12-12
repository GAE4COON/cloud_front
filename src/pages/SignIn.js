/* global google */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth.js";
import { useAuth } from "../utils/auth/authContext";
import jwt_decode from "jwt-decode";
import "../styles/App.css";
import "../styles/signin.css";
import { message } from "antd";

message.config({
  top: 50,
  duration: 3,
});

function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleSignIn = async () => {
    const userData = {
      user_id: id,
      user_pw: password,
    };

    try {
      const response = await login(userData);
      console.log(response.data);
      const { grantType, accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("tokenType", grantType);

      console.log("Local check :", localStorage.getItem("accessToken"));

      window.location.href = "/";
    } catch (error) {
      console.error("로그인 실패!!:", error.message);
      message.warning("로그인에 실패했습니다. 아이디 및 비밀번호를 확인해주세요.");
      if (error.response) {
        console.error("응답 상태:", error.response.status);
        console.error("응답 데이터:", error.response.data);
      }
    }
  };

  async function handleCallbackResponse(response) {
    //console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      //console.log(userObject);

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (e) {
      if (e.response) {
        console.error("Server error:", e.response.data);
      } else if (e.request) {
        console.error("No response received:", e.request);
      } else {
        console.error("Error:", e.message);
      }
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "930334345436-48kqha501bfk7c6snk5k2vlai4r1231n.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "signIn",
      shape: "rectangular",
    });
  }, []);

  return (
    <div className="main-content">
      <h1></h1>
      <div className="sign-in-form">
        <h1>로그인</h1>
        <div className="input-group">
          <label>아이디</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignIn} className="submit">
          제출
        </button>

        <div
          id="signInDiv"
          className="googleDiv"
          style={{ visibility: user ? "hidden" : "visible" }}
        ></div>
      </div>
    </div>
  );
}

export default SignIn;
