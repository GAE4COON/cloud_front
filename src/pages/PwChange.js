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
import { myuser, myPwModify, myPwCheck } from "../apis/auth";
import userEvent from "@testing-library/user-event";

function PwChange() {
  const { user, setUser } = useAuth();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [curpw, setcurpw] = useState("");
  const [curpwcheck, setcurpwcheck] = useState("");
  const [newpw, setnewpw] = useState("");
  const [newpwcheck, setnewpwcheck] = useState("");
  const [PwConfirmed, setPwConfirmed] = useState(false);
  const [PwVerified, setPwVerified] = useState(false);
  const [NewPwVerified, setNewPwVerified] = useState(false);

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
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // 의존성 배열에 user.sub를 추가하는 것을 고려하세요

  useEffect(() => {
    if (curpw === curpwcheck && curpw !== "") {
      setPwVerified(false);
    } else {
      setPwVerified(true);
    }
  }, [curpw, curpwcheck]);

  useEffect(() => {
    if (newpw === newpwcheck && newpw !== "") {
      setNewPwVerified(false);
    } else {
      setNewPwVerified(true);
    }
  }, [newpw, newpwcheck]);

  const handleCurPwChange = (e) => {
    setcurpw(e.target.value);
  };

  const handleCurPwCheckChange = (e) => {
    setcurpwcheck(e.target.value);
  };

  const handleNewPwChange = (e) => {
    setnewpw(e.target.value);
  };

  const handleNewPwCheckChange = (e) => {
    setnewpwcheck(e.target.value);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/";
  };

  const handleCurPwCheck = async () => {
    const data = {
      user_id: user.sub,
      user_pw: curpw,
    };
    try {
      const response = await myPwCheck(data);
      if (response.data.result === "success") {
        console.log("res: ", response.data.result);
        setPwConfirmed(true);
        setPwVerified(true);
        message.success("패스워스를 확인했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNewPwCheck = async () => {
    const data = {
      user_id: user.sub,
      user_pw: newpw,
    };
    try {
      const response = await myPwModify(data);
      if (response.data.result === "success") {
        console.log("res: ", response.data.result);
        message.success("패스워드가 변경되었습니다.");
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
                <label>현재 PW</label>
                <input
                  type="password"
                  value={curpw}
                  onChange={handleCurPwChange}
                />
                <div></div>
              </div>
              <div className="my-input-group">
                <label>현재 PW 확인</label>
                <input
                  type="password"
                  value={curpwcheck}
                  onChange={handleCurPwCheckChange}
                />
                <Button onClick={handleCurPwCheck} disabled={PwVerified}>
                  확인
                </Button>
              </div>

              {PwConfirmed ? (
                <>
                  <div className="my-input-group">
                    <label>새 PW</label>
                    <input
                      type="password"
                      value={newpw}
                      onChange={handleNewPwChange}
                    />
                    <div></div>
                  </div>
                  <div className="my-input-group">
                    <label>새 PW 확인</label>
                    <input
                      type="password"
                      value={newpwcheck}
                      onChange={handleNewPwCheckChange}
                    />
                    <Button onClick={handleNewPwCheck} disabled={NewPwVerified}>
                      확인
                    </Button>
                  </div>
                </>
              ) : null}
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

export default PwChange;
