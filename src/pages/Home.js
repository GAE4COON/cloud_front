import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import styled from "styled-components";
// import { useCookies } from "react-cookie";
// import { loginTest } from "../apis/auth.js";
import Page1 from "./Home/Page1";
import Page2 from "./Home/Page2";
import Page3 from "./Home/Page3";
import Page4 from "./Home/Page4";
import { Button } from "antd";

function Home() {
  const navigate = useNavigate();
  // const [Greeting, setGreeting] = useState("");
  // const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  // useEffect(() => {
  //   // useCookies 훅에서 제공하는 cookies 객체를 사용하여 accessToken 값을 가져옵니다.
  //   const token = cookies.accessToken;

  //   const fetchData = async () => {
  //     if (token) {
  //       try {
  //         const response = await loginTest(token);
  //         setGreeting(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       console.log("No token found in cookies.");
  //     }
  //   };
  // }, [cookies]);

  const handleAutoDraw = () => {
    navigate("/draw/auto");
  };

  const handleJustDraw = () => {
    navigate("/draw");
  };

  return (
    <>
      <Fragment>
        <HomeContainer>
          <HomeContent>
            {/* <img src="assets/img/hometext.png" alt="logo" className="home-text" /> */}
            <HomeTextContent>
            <HomeText>NewFra와 함께<br/> 클라우드 환경에 빠르게 적응해보세요.</HomeText>
            <HomeTextDescription>NewFra는 클라우드에 대한 전문지식이 없는 사람들도 쉽게 클라우드 환경을 이해하고 활용할 수 있도록 돕는 클라우드 마이그레이션 및 도입 지원 플랫폼입니다.</HomeTextDescription>
            </HomeTextContent>
            <HomeImg src="assets/img/homelogo.png" alt="logo" />
          </HomeContent>
            <HomeButtonText>지금 그려보세요.</HomeButtonText>
            <HomeSelectBox>

            <StyledButton onClick={handleAutoDraw}>
              Use Template
            </StyledButton>
            <StyledButton onClick={handleJustDraw}>
              Just Draw
            </StyledButton>
          </HomeSelectBox>
        </HomeContainer>
      </Fragment>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </>
  );
}

const StyledButton = styled(Button)`
  min-width: 150px;
  height: 40px;
  font-size: 16px;
  color: #0070C0;
  background-color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
`

const HomeButtonText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  text-align: left;
  margin-left: 10%;
  margin-bottom: 20px;
  `;

const HomeContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 95vh;
  width: 100%;
  background-image: linear-gradient(135deg, #00B0F0, #0070C0, #002060);
  clip-path: polygon(0 0, 100% 0%, 100% 90%, 0 100%);

 `;

const HomeTextDescription = styled.div`

  font-size: 18px;
  /* font-weight: 600; */
  color: #fff;
  /* flex: 2; */
  font-family: "Noto Sans KR", sans-serif;
  /* font-weight: 800; */
  text-align: left;
  `;

const HomeText = styled.div`
  font-size: 38px;
  font-weight: 600;
  color: #fff;
  flex: 2;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
  text-align: left;
  text-shadow: 1px 1px 1px gray;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 3px solid #fff;
  /* border: 1px solid red; */
    /* max-width: 50%; */
`;

const HomeImg = styled.img`
margin-top: 100px;
  animation: floatAnimation 2s ease-in-out infinite;
  height: auto;
  width: 30%;
  filter: brightness(120%);
`;

const HomeTextContent = styled.div`

`;

const HomeContent = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  flex-direction: row; /* Ensure the direction is row */
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
  gap: 30px;
  height: 60%;
`;

const HomeSelectBox = styled.div`
  color:#3064D6;
  z-index: 1;
  font-size: 1rem; 
  display: flex;
  margin-left: 10%;
  flex-direction: row; // Ensures the buttons are in a row
  justify-content: flex-start; // Aligns the buttons to the left
  gap: 20px; // Keeps space between the buttons
  `;

export default Home;
