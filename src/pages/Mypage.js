/* global google */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import "../styles/App.css";
import { useAuth } from "../utils/auth/authContext";
import jwtDecode from "jwt-decode";
import "../styles/mypageInfo.css";
import { message, Button } from "antd";
import { myuser, myNameModify, myPwModify } from "../apis/auth";
import userEvent from "@testing-library/user-event";

function MyPage() {
  const { user, setUser } = useAuth();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken);
        // 주의: 실제 환경에서는 토큰이 만료되었는지 확인하는 로직도 필요합니다.
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token");
      }
    } else {
      setUser(null);
    }
  }, [ACCESS_TOKEN]);

  // window.location.href = "/mypage";/

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        user_id: user.sub,
      };
      try {
        const response = await myuser(data);
        if (response.data) {
          console.log("response.data", response.data);
          setId(response.data.user_id);
          setName(response.data.name);
          setEmail(response.data.email);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // 의존성 배열에 user.sub를 추가하는 것을 고려하세요

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/";
  };

  const handleNameModify = async () => {
    const data = {
      user_id: user.sub,
      name: name,
    };
    try {
      const response = await myNameModify(data);
      if (response.data.result === "success") {
        console.log("res: ", response.data.result);
        message.success("닉네임이 변경되었습니다.");
        handleSignOut();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <Sidebar />
          </div>
          <div className="main-container">
            <StyledSideMenuTitle>
              <div>{user.sub}님의 마이페이지</div>
            </StyledSideMenuTitle>
            {/* mypage id, email imformation */}
            <div className="mypage-info-container">
              <div className="my-input-group">
                <label>아이디</label>
                <input
                  type="text"
                  value={id}
                  // onChange={handleIdChange}
                />
                <div></div>
              </div>

              <div className="my-input-group">
                <label>닉네임</label>
                <input type="text" value={name} onChange={handleNameChange} />
                <Button onClick={handleNameModify}>변경</Button>
              </div>

              <div className="my-input-group">
                <label>이메일</label>
                <input
                  type="email"
                  value={email}
                  // onChange={handleEmailChange}
                />
                <div></div>
              </div>
              <div className="my-input-group">
                <h4>
                  <a href="/mypage/change/pw">비밀번호 변경</a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledSideMenuTitle = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
  margin-top: 25px;
  justify-content: space-between;
  padding-right: 25px;
  padding-left: 25px;
  margin-left: 30px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  margin-left: 50px;
`;

export default MyPage;
