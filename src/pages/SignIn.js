import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth.js";

import "../styles/signin.css";

function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  const handleSignIn = async () => {
    const userData = {
      user_id: id,
      user_pw: password,
    };

    try {
      const response = await login(userData);
      const { accessToken, refreshToken } = response.data;

      setCookie("accessToken", accessToken, {
        path: "/",
        //httpOnly: true,
        // 다른 쿠키 설정들 (예: maxAge, domain, secure 등)도 추가 가능
      });

      setCookie("refreshToken", refreshToken, {
        path: "/",
        //httpOnly: true,
        // 다른 쿠키 설정들 (예: maxAge, domain, secure 등)도 추가 가능
      });

      console.log("로그인 성공 :", response.data);

      navigate("/");
    } catch (error) {
      console.log("로그인 실패 :", error.response);
      alert("로그인 실패");
    }
  };

  return (
    <>
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
      </div>
    </>
  );
}

export default SignIn;
