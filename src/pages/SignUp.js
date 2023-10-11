/* global google */
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../utils/auth/authContext";
import { useNavigate } from "react-router-dom";
import { idCheck, emailCheck, codeCheck, join } from "../apis/auth.js";
import "../styles/signup.css";

function Signup() {
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [belongError, setbelongError] = useState("");
  const [phoneError, setphoneError] = useState("");

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

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const isValidId = (id) => {
    const idRegex = /^[A-Za-z0-9]{6,20}$/;
    return idRegex.test(id);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z0-9])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[A-Za-z0-9!@#$%^&*()\-_+=]{8,20}$/;
    return passwordRegex.test(password);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z0-9가-힣]{2,15}$/;
    return nameRegex.test(name);
  };

  const isValidBelong = (belong) => {
    const belongRegex = /^[a-zA-Z0-9가-힣]{2,15}$/;
    return belongRegex.test(belong);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{3,15}$/;
    return phoneRegex.test(phone);
  };

  //휴대폰 유효성 검사
  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    if (!isValidPhone(phoneValue)) {
      setphoneError("올바른 휴대폰번호 형식을 입력해주세요.");
    } else {
      setphoneError("");
    }
  };

  //이메일 유효성 검사
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!isValidEmail(emailValue)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  //비밀번호 유효성 검사
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (!isValidPassword(passwordValue)) {
      setPasswordError(
        "비밀번호는 하나의 문자, 숫자, 특수문자를 8자 포함해야 합니다.\n허용문자:!@#$%^&*()-_+="
      );
    } else {
      setPasswordError("");
    }
  };

  //이름 유효성 검사
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    if (!isValidName(nameValue)) {
      setNameError("이름은 최소 두글자 이상을 입력해주세요.");
    } else {
      setNameError("");
    }
  };

  //소속 유효성 검사
  const handleBelongChange = (e) => {
    const belongValue = e.target.value;
    setBelong(belongValue);
    if (!isValidBelong(belongValue)) {
      setbelongError("소속은 최소 두글자 이상을 입력해주세요.");
    } else {
      setbelongError("");
    }
  };

  //아이디 유효성 검사
  const handleIdChange = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    setIdStatus(null);
    if (!isValidId(idValue)) {
      setIdError("아이디는 6~20자의 영문 대소문자와 숫자로 구성되어야 합니다.");
    } else {
      setIdError("");
    }
  };

  //패스워드 동일한지 확인
  useEffect(() => {
    if (password !== passwordConfirm && passwordConfirm !== "") {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  }, [password, passwordConfirm]);

  //아이디 중복 확인
  const checkIdDuplication = async () => {
    const data = {
      user_id: id,
    };
    try {
      const response = await idCheck(data);

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

  //인증코드 전송
  const checkEmail = async () => {
    const data = {
      email: email,
    };

    try {
      const response = await emailCheck(data);

      setEmailConfirmed(true);
      if (response.data.result) {
        alert("인증 코드를 보냈습니다.");
      }
    } catch (error) {
      console.error("이메일 전송 중 오류가 발생했습니다.", error);
    }
  };

  //메일 코드인증
  const checkCode = async () => {
    const data = {
      email: email,
      code: verificationCode,
    };

    try {
      const response = await codeCheck(data);
      setEmailVerified(true);
      if (response.data.result) {
        alert("인증이 완료되었습니다.");
      }
    } catch (error) {
      console.error("코드 확인 실패.", error);
    }
  };

  //회원가입
  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!emailConfirmed) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    const data = {
      user_id: id,
      user_pw: password,
      user_check_pw: passwordConfirm,
      user_name: name,
      belong: belong,
      phone_number: phone,
      email: email,
      emailCheck: emailVerified,
    };

    try {
      // API 요청
      const response = await join(data);

      if (response.data.result === "success") {
        alert("성공적으로 회원가입되었습니다.");
        navigate("/login");
      } else {
        alert(response.data.message || "회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다.", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  async function handleCallbackResponse(response) {
    console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      console.log(userObject);

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
        <>
          <div className="input-group">
            <label>인증 코드 *</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              onClick={checkCode}
              disabled={emailVerified}
              style={
                emailVerified
                  ? { backgroundColor: "#ccc", cursor: "not-allowed" }
                  : {}
              }
            >
              확인
            </button>
          </div>
          {emailVerified && (
            <span className="success-text">인증되었습니다.</span>
          )}
        </>
      ) : null}

      <div className="input-group">
        <label>휴대전화 *</label>
        <input type="tel" value={phone} onChange={handlePhoneChange} />
        <div></div>
      </div>
      {phoneError && <span className="error-text">{phoneError}</span>}

      <div className="input-group">
        <label>이름 *</label>
        <input type="text" value={name} onChange={handleNameChange} />
        <div></div>
      </div>
      {nameError && <span className="error-text">{nameError}</span>}

      <div className="input-group">
        <label>소속 *</label>
        <input type="text" value={belong} onChange={handleBelongChange} />
        <div></div>
      </div>
      {belongError && <span className="error-text">{belongError}</span>}

      <button
        onClick={handleSignUp}
        className="submit"
        disabled={
          idStatus !== "available" ||
          !emailVerified ||
          id === "" ||
          password !== passwordConfirm ||
          password === "" ||
          email === "" ||
          phone === "" ||
          belong === "" ||
          name === "" ||
          belongError !== "" ||
          nameError !== "" ||
          passwordError !== "" ||
          emailError !== "" ||
          idError !== ""
        }
        style={
          idStatus !== "available" ||
          !emailVerified ||
          id === "" ||
          password !== passwordConfirm ||
          password === "" ||
          email === "" ||
          phone === "" ||
          name === "" ||
          belong === "" ||
          belongError !== "" ||
          nameError !== "" ||
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
