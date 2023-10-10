import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./../utils/auth/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

import {
  NavContainer,
  DropdownMenu,
  HamburgerContainer,
  Hamburger,
  NavStyled,
  NavMenuLeft,
  NavMenuRight,
  NavLinkLogo,
  NavLink,
  SpecialNavLink,
  NavBtn,
  NavBtnLink,
  UserProfileImage,
} from "../styles/NavbarStyle";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const menuRef = useRef(null);
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // 주의: 실제 환경에서는 토큰이 만료되었는지 확인하는 로직도 필요합니다.
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token");
      }
    }

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cookies]);

  async function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem("user");
    removeCookie("accessToken");
    removeCookie("refreshToken");
  }

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logoutNclose = (event) => {
    closeMenu(); // 첫 번째 함수 호출
    handleSignOut(event); // 두 번째 함수 호출
  };

  return (
    <NavContainer>
      <NavStyled ref={menuRef}>
        <NavLinkLogo to="/">
          <img src="/assets/img/logo.png" alt="logo" />
        </NavLinkLogo>

        <NavMenuLeft isOpen={isOpen} onMouseLeave={closeMenu}>
          <NavLink
            onClick={closeMenu}
            to="/home"
            onMouseEnter={() => setDropdownOpen(true)} // 호버 시 드롭다운 열기
            onMouseLeave={() => setDropdownOpen(false)} // 호버 떼면 드롭다운 닫기
            className={location.pathname.startsWith("/home") ? "active" : ""}
          >
            Home
            {isDropdownOpen && (
              <DropdownMenu>
                <NavLink onClick={closeMenu} to="/home">
                  Home
                </NavLink>
                <NavLink
                  style={{ paddingTop: "8px" }}
                  onClick={closeMenu}
                  to="/home/autodraw"
                >
                  Auto Draw
                </NavLink>
              </DropdownMenu>
            )}
          </NavLink>

          <NavLink
            onClick={closeMenu}
            to="/draw"
            className={location.pathname === "/draw" ? "active" : ""}
          >
            Draw
          </NavLink>

          <NavLink
            onClick={closeMenu}
            to="/about"
            onMouseEnter={() => setDropdownOpen(true)} // 호버 시 드롭다운 열기
            onMouseLeave={() => setDropdownOpen(false)} // 호버 떼면 드롭다운 닫기
            className={location.pathname.startsWith("/about") ? "active" : ""}
          >
            About
            {isDropdownOpen && (
              <DropdownMenu>
                <NavLink onClick={closeMenu} to="/about">
                  About
                </NavLink>
                <NavLink
                  style={{ paddingTop: "8px" }}
                  onClick={closeMenu}
                  to="/about/example"
                >
                  Learn Example
                </NavLink>
              </DropdownMenu>
            )}
          </NavLink>

          {!user && (
            <SpecialNavLink
              className="special-nav-link"
              onClick={closeMenu}
              to="/sign-up"
            >
              Login Page
            </SpecialNavLink>
          )}
          {user && (
            <SpecialNavLink className="special-nav-link" onClick={logoutNclose}>
              Sign Out
            </SpecialNavLink>
          )}
        </NavMenuLeft>

        <HamburgerContainer>
          <Hamburger onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu size={50} color="#3b6c7d" />
          </Hamburger>
        </HamburgerContainer>

        <NavMenuRight isOpen={isOpen}>
          {user ? (
            <>
              <NavBtn>
                <h5>{user.name ? user.name : user.sub}님</h5>
              </NavBtn>
              {/* <span>{user.name}</span> */}
              <NavBtn>
                <NavBtnLink onClick={(e) => handleSignOut(e)}>
                  Sign out
                </NavBtnLink>
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn>
                <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
              </NavBtn>
              <NavBtn>
                <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
              </NavBtn>
            </>
          )}
        </NavMenuRight>
      </NavStyled>
    </NavContainer>
  );
};

export default Navbar;
