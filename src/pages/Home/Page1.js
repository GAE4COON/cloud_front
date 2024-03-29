import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Button } from "antd";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export default function Page1() {
  const [jsonData, setJsonData] = useState(null);

  const [imageRef, imageInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/json/network.json");
        const filejson = await response.json();
        console.log("filejson", filejson);
        setJsonData(filejson); // Store the JSON data in state
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <FlexContainer>
      <ImageContainer ref={imageRef} inView={imageInView}>
        <img src="assets/img/Home(Network)2.png" alt="logo" />
      </ImageContainer>
      <ButtonContainer ref={imageRef} inView={imageInView}>
        <h2>Network</h2>
        <p>엑셀에 있는 자산을 기반으로 네트워크 자동 도식화를 제공합니다.</p>
        <div style={{ marginTop: "5%" }}>
          <Link to="/draw" state={{ file: jsonData }}>
            <Button type="primary">See More</Button>
          </Link>
        </div>
      </ButtonContainer>
    </FlexContainer>
  );
}

// CSS animations and styled components remain unchanged

const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 1s ease-out forwards;
`;

const slideInFromRight = css`
  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  animation: slideInFromRight 1s ease-out forwards;
`;
const FlexContainer = styled.div`
font-family: "Noto Sans KR", sans-serif;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  align-items: center;
`;

const ImageContainer = styled.div`
  ${({ inView }) => inView && fadeIn}
  img {
    max-width: 60%; /* Reduced width */
    max-height: 60%; /* Reduced height */
    height: auto;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  flex: 7;
`;
const ButtonContainer = styled.div`
  ${({ inView }) => inView && fadeIn}
  text-align: left;
  flex: 3;
  h2 {
    font-size: 32px;
    color: (0, 0, 0, 0.65);
    font-weight: 400;
    white-space: nowrap;
    margin-top: 40%; // Add top margin if needed, adjust as necessary
    margin-bottom: 20px; // Space below the h2, adjust as necessary
  }
  margin-right: 10%;
`;
