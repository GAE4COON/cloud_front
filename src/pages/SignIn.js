import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/signin.css";

function SignIn() {
  // Define state variables
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [Greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  // useEffect(() => {
  //   axios
  //     .get("/api/v1/test-api/login-test")
  //     .then((response) => setGreeting(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  const handleSignIn = () => {
    const userData = {
      user_id: id,
      user_pw: password, // 실제 사용 시에는 비밀번호 암호화를 고려하세요.
    };

    axios
      .post("/api/v1/users-api/sign-in", userData)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;

        setCookie("accessToken", accessToken, {
          path: "/",
          //httpOnly: true,
          // 다른 쿠키 설정들 (예: maxAge, domain, secure 등)도 추가할 수 있습니다.
        });

        setCookie("refreshToken", refreshToken, {
          path: "/",
          //httpOnly: true,
          // 다른 쿠키 설정들 (예: maxAge, domain, secure 등)도 추가할 수 있습니다.
        });
        console.log("로그인 성공 :", response.data);
        navigate("/"); // 로그인 성공 후 루트 페이지로 리디렉트
      })
      .catch((error) => console.log(error));
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
