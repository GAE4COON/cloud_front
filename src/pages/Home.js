import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useCookies } from "react-cookie";
import { loginTest } from "../apis/auth.js";

function Home() {
  const navigate = useNavigate();
  const [Greeting, setGreeting] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    // useCookies 훅에서 제공하는 cookies 객체를 사용하여 accessToken 값을 가져옵니다.
    const token = cookies.accessToken;

    const fetchData = async () => {
      if (token) {
        try {
          const response = await loginTest(token);
          setGreeting(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token found in cookies.");
      }
    };
  }, [cookies]);

  const handleAutoDraw = () => {
    navigate("/home/autodraw");
  };

  const handleJustDraw = () => {
    navigate("/draw");
  };

  return (
    <Fragment>
      <div className="home-content">
        <div className="img-container">
          <h1>{Greeting}</h1>
          <h1>{Greeting}</h1>
          <img
            src="assets/img/Cloud-architecture.png"
            alt="logo"
            className="home-img"
          />
          <div className="home-select-box">
            <h1>WELCOME TO CLOUD MAESTRO!</h1>
            <h2 className="home-select-text">
              Automated Diagram of a Cloud Architecture with Security
              Considerations
            </h2>
            <button className="home-btn" onClick={handleAutoDraw}>
              Auto Draw!
            </button>
            <button className="home-btn" onClick={handleJustDraw}>
              Just Draw!
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
