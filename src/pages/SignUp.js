/* global google */
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../utils/auth/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

function Signup() {
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [idStatus, setIdStatus] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [belong, setBelong] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8 자, 최소 하나의 문자와 하나의 숫자
    return passwordRegex.test(password);
  };

  const isValidId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{4,12}$/; // 4~12자의 영문 대소문자와 숫자
    return idRegex.test(id);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!isValidEmail(emailValue)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (!isValidPassword(passwordValue)) {
      setPasswordError(
        "비밀번호는 최소 8자, 최소 하나의 문자와 하나의 숫자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleIdChange = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    if (!isValidId(idValue)) {
      setIdError("아이디는 4~12자의 영문 대소문자와 숫자로 구성되어야 합니다.");
    } else {
      setIdError("");
    }
  };

  const checkIdDuplication = async () => {
    const data = {
      user_id: id,
    };
    try {
      const response = await axios.post(
        "/api/v1/users/id-dup-check",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result) {
        setIdStatus("taken");
      } else {
        setIdStatus("available");
      }
    } catch (error) {
      console.error("Error checking ID duplication:", error);
      alert("아이디 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (password !== passwordConfirm && passwordConfirm !== "") {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  }, [password, passwordConfirm]);

  const checkEmail = async () => {
    const data = {
      email: email,
    };

    try {
      const response = await axios.post(
        "/api/v1/users/mailConfirm",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmailConfirmed(true);
      if (response.data.result) {
        alert("인증 코드를 보냈습니다.");
      }
    } catch (error) {
      console.error("이메일 전송 중 오류가 발생했습니다.", error);
    }
  };

  const checkCode = async () => {
    const data = {
      email: email,
      code: verificationCode,
    };

    try {
      const response = await axios.post(
        "/api/v1/users/authCode",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmailVerified(true);
      if (response.data.result) {
        alert("인증이 완료되었습니다.");
      }
    } catch (error) {
      console.error("코드 확인 실패.", error);
    }
  };
  const handleSignUp = async () => {
    // 필요한 검증 로직 추가 (예: password와 checkpassword가 같은지 확인)
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!emailConfirmed) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    // 서버에 보낼 데이터 객체 생성
    const data = {
      user_id: id,
      user_pw: password,
      user_check_pw: passwordConfirm,
      phone_number: phone,
      email: email,
      name: name,
      belong: belong,
      emailCheck: emailConfirmed,
    };

    try {
      // API 요청
      const response = await axios.post(
        "/api/v1/users/sign-up",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result) {
        alert("성공적으로 회원가입되었습니다.");
        // 다른 로직이나 페이지 리다이렉트 등 필요한 처리 추가
      } else {
        alert(response.data.message || "회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다.", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      console.log(userObject);

      setTimeout(() => {
        navigate("/");
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
    <div className="sign-up-form">
      <h1>회원가입</h1>
      <div className="input-group">
        <label>아이디 *</label>
        <input type="text" value={id} onChange={handleIdChange} />
        <button onClick={checkIdDuplication}>중복확인</button>
      </div>
      {idError && <span className="error-text">{idError}</span>}
      {idStatus === "taken" && (
        <span className="error-text">이미 사용중인 아이디입니다.</span>
      )}
      {idStatus === "available" && (
        <span className="success-text">사용 가능한 아이디입니다.</span>
      )}

      <div className="input-group">
        <label>비밀번호 *</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div></div>
      </div>
      {passwordError && <span className="error-text">{passwordError}</span>}

      <div className="input-group">
        <label>비밀번호확인 *</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div></div>
      </div>
      {passwordConfirmError && (
        <span className="error-text">{passwordConfirmError}</span>
      )}

      <div className="input-group">
        <label>이메일 *</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          disabled={emailVerified}
        />
        <button onClick={checkEmail}>인증요청</button>
      </div>
      {emailError && <span className="error-text">{emailError}</span>}
      <div></div>

      {emailConfirmed ? (
        <div className="input-group">
          <label>인증 코드 *</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={checkCode}>확인</button>
        </div>
      ) : null}

      <div className="input-group">
        <label>휴대전화 *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div></div>
      </div>

      <div className="input-group">
        <label>이름 *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div></div>
      </div>

      <div className="input-group">
        <label>소속 *</label>
        <input
          type="text"
          value={belong}
          onChange={(e) => setBelong(e.target.value)}
        />
        <div></div>
      </div>

      <button
        onClick={handleSignUp}
        className="submit"
        disabled={
          idStatus !== "available" ||
          !emailConfirmed ||
          id === "" ||
          password !== passwordConfirm ||
          password === "" ||
          email === "" ||
          phone === "" ||
          passwordError !== "" ||
          emailError !== "" ||
          idError !== ""
        }
        style={
          idStatus !== "available" ||
          !emailConfirmed ||
          id === "" ||
          password !== passwordConfirm ||
          password === "" ||
          email === "" ||
          phone === "" ||
          name === "" ||
          belong === "" ||
          passwordError !== "" ||
          emailError !== "" ||
          idError !== ""
            ? { backgroundColor: "#ccc", cursor: "not-allowed" }
            : {}
        }
      >
        제출
      </button>

      <p>
        아이디가 있는 경우 <a href="/login">로그인해주세요</a>. 가입 후 아이디
        변경은 불가합니다. 가입을 하면 <a href="/terms">이용약관</a>,{" "}
        <a href="/privacy">개인정보취급 방침</a> 및 개인정보3자제공에 동의하게
        됩니다.
      </p>
      {user ? (
        <div>
          <img
            src={user.picture}
            alt={user.name}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
          />
          <h3>{user.name}</h3>
        </div>
      ) : null}
      <div
        id="signInDiv"
        className="googleDiv"
        style={{ visibility: user ? "hidden" : "visible" }}
      ></div>
    </div>
  );
}

export default Signup;
