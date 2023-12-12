import React, { useState, useEffect } from "react";
import { useAuth } from "./../utils/auth/authContext";
import { useLocation, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styled from "styled-components";

const { Header } = Layout;

const Navbar = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token");
      }
    } else {
      setUser(null);
      localStorage.clear();
    }
  }, [ACCESS_TOKEN, setUser]);

  const handleSignOut = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/";
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const userDropdownMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/mypage/diagram">MyPage</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleSignOut} icon={<LogoutOutlined />}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
  const homeMenu = (
    <Menu>
      <Menu.Item key="autodraw">
        <Link to="/draw/auto">Use Template</Link>
      </Menu.Item>
      <Menu.Item key="draw">
        <Link to="/draw">Just Draw</Link>
      </Menu.Item>
    </Menu>
  );
  

  return (
    <NavStyled style={{ fontFamily: "Noto Sans KR", backgroundColor:"white", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <NavLink to="/">
        <img src="/assets/img/logo.png" alt="logo" />
      </NavLink>
      <Menu mode="horizontal" selectedKeys={[location.pathname]} style={{ flex: 1 }}>
      <Menu.Item key="/home">

            <NavLink to="/home">
              Home
            </NavLink>
        </Menu.Item>
        <Menu.Item key="/draw">
        <Dropdown
            overlay={homeMenu}
            trigger={['hover']}
            visible={isDropdownVisible}
            onVisibleChange={setIsDropdownVisible}
          >
          <NavLink to="/draw" className="ant-dropdown-link" onClick={toggleDropdown}>Draw</NavLink>
          </Dropdown>

        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to="/about">Introduce</NavLink>
        </Menu.Item>
      </Menu>
      {user ? (
        <Dropdown overlay={userDropdownMenu} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()}>
            <Username>{user.name}님</Username> 
          </a>
        </Dropdown>
      ) : (
        <Button.Group>
            <NavBtnLink to="/sign-in">로그인</NavBtnLink>
            <NavBtnLink to="/sign-up">회원가입</NavBtnLink>
        </Button.Group>
      )}
    </NavStyled>
  );
};

export default Navbar;

const Username = styled.div`
  width: auto;
  height: auto;
  border-radius: 4px;
  padding: 5px 12px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  // margin-left: 5px;
  align-items: center;
  font-size: 16px;
`;
const NavBtnLink = styled(Link)`
  width: 65px;
  border-radius: 4px;
  /* background: #fff; */
  padding: 5px 12px;
  color: #3064d6;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  // margin-left: 5px;
  align-items: center;
  font-size: 16px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #3064d6;
    font-weight: bold;
  }
`;


const NavLink = styled(Link)`
  position: relative;
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 17px;
  height: 100%;
  cursor: pointer;

  margin-right: 20px; // adjust as needed
  &:last-child {
    margin-right: 0; // so the last item doesn't have extra margin
  }

  & img {
    width: 40px;
    height: auto;
    margin-right: 50px;
  }

  &.active {
    color: #3064d6;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #3064d6;
  }
`;

const NavStyled = styled(Header)`
  background: #fff;
  width: 100%;
  /* height: 35px; */
  display: flex;
  justify-content: space-around;
  padding: 0.5rem calc(0.125 * ((100vw - 1000px) / 2));
  z-index: 999;
  position: fixed;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans KR", sans-serif !important;


`;