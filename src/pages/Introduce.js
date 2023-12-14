import React, { useEffect, useRef, useState } from "react";
import "../styles/Introduce.css";
import { Tabs } from "antd";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button, Flex } from "antd";
import IntroduceSecurity from "./Introduce/IntroduceSecurity";
// PAGE

import First from "./Introduce/First";
import Second from "./Introduce/Second";
import Third from "./Introduce/Third";
import Introduce from "./Introduce/intro";
import { Container } from "react-bootstrap";
const { TabPane } = Tabs;

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LogoSection = () => {
  return (
    <div className="logo-container">
      <div className="content">
        <img src="assets/img/introducelogo.png" alt="logo" />
      </div>
    </div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  let ref = useRef(null);
  ref.current = [];
  let isScrolling = false;

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  // Custom scroll function
  const scrollTo = (element) => {
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element.offsetTop,
        },
      });
    }
  };
  useEffect(() => {
    ref.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0, // 시작 투명도
          y: 100, // 아래에서 시작 (예: 50px 아래에서 시작)
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  let containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScroll = (e) => {
    if (isAnimating) return;

    let index = ref.current.indexOf(e.currentTarget);

    if (e.deltaY > 0 && index < ref.current.length - 1) {
      setIsAnimating(true);
      gsap.to(containerRef.current, {
        duration: 1,
        scrollTo: {
          y: (index + 1) * window.innerHeight,
        },
        onComplete: () => setIsAnimating(false),
      });
    } else if (e.deltaY < 0 && index > 0) {
      setIsAnimating(true);
      gsap.to(containerRef.current, {
        duration: 1,
        scrollTo: {
          y: (index - 1) * window.innerHeight,
        },
        onComplete: () => setIsAnimating(false),
      });
    }
  };

  const ImageSection = () => {
    return (
      <>
        {/* <span
          style={{
            fontFamily: "Noto Sans KR",
            textShadow: "2px 2px lightgray",
            fontWeight: "bold",
            color: "#4D6295",
            fontSize: "50px",
          }}
        >
          Cloud Maestro는..
        </span> */}
        <FlexContainer>
          <ImageContainer>
            <img
              src="assets/img/icon1.png"
              alt="logo"
              style={{ width: "100px" }}
            />
            <ButtonContainer>
              <h2>Architecture</h2>
              <p>클라우드 최적화 아키텍처 도식화</p>
              <div style={{ marginTop: "5%" }}></div>
            </ButtonContainer>
          </ImageContainer>
          <ImageContainer>
            <img
              src="assets/img/icon3.png"
              alt="logo"
              style={{ width: "100px" }}
            />
            <ButtonContainer>
              <h2>Cost</h2>
              <p>서비스, 인스턴스를 고려한 정확한 비용 산정</p>
              <div style={{ marginTop: "5%" }}></div>
            </ButtonContainer>
          </ImageContainer>
          <ImageContainer>
            <img
              src="assets/img/icon2.png"
              alt="logo"
              style={{ width: "100px" }}
            />
            <ButtonContainer>
              <h2>Security</h2>
              <p>사전 보안성 점검 보안 권고 및 가이드 기능</p>
              <div style={{ marginTop: "5%" }}></div>
            </ButtonContainer>
          </ImageContainer>
        </FlexContainer>
      </>
    );
  };

  const TabSection = () => {
    return (
      <TabsContainer>
        <StyledAntTabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={handleTabClick}
        >
          <TabPane tab="Cloud Migration이란?" key="1">
            <First />
          </TabPane>
          <TabPane tab="클라우드 보안, 꼭 필요할까?" key="2">
            <Second />
          </TabPane>
          <TabPane tab="ISO/IEC 27001이란?" key="3">
            <Third />
          </TabPane>
        </StyledAntTabs>
      </TabsContainer>
    );
  };

  const Flow = () => {
    return (
      <SecurityContainer>
        <ButtonContainer>
          <h2>Lift and Shift</h2>
          <p>네트워크 기반 클라우드 도식화 (일대일 대응)</p>
        </ButtonContainer>
        <div style={{ marginTop: "100px" }}>
          <img
            src="/assets/img/arrow.png"
            width="30px"
            height="30px"
            alt="Arrow"
          />
        </div>
        <ButtonContainer>
          <h2>Security</h2>
          <p>리소스 사용 상의 보안 가이드 라인</p>
          <p>아키텍처 설계 상의 보안 권고</p>
          <p>운영 상의 보안</p>
        </ButtonContainer>
        <div style={{ marginTop: "100px" }}>
          <img
            src="/assets/img/arrow.png"
            width="30px"
            height="30px"
            alt="Arrow"
          />
        </div>

        <ButtonContainer>
          <h2>Optimize</h2>
          <p>사용자 요구사항을 기반으로 한 최적화 아키텍처 도출</p>
        </ButtonContainer>
        <div style={{ marginTop: "100px" }}>
          <img
            src="/assets/img/arrow.png"
            width="30px"
            height="30px"
            alt="Arrow"
          />
        </div>
        <ButtonContainer>
          <h2>Cost</h2>
          <p>정확한 예상 비용 산정 결과 도출</p>
        </ButtonContainer>
      </SecurityContainer>
    );
  };

  return (
    <div className="about-container">
      <div className="section" ref={addtoRefs}>
       {/* { <LogoSection />} */}
        <Introduce />
      </div>
      <div className="section" ref={addtoRefs}>
        <ImageSection />
      </div>
      <div className="section" ref={addtoRefs}>
        <TabSection />
      </div>

      <div className="section" ref={addtoRefs}>
        <Flow />
      </div>
      <div className="section" ref={addtoRefs}>
        <IntroduceSecurity />
      </div>
    </div>
  );
};

export default Home;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column; /* if flex */

  justify-content: center;
`;
const StyledAntTabs = styled(Tabs)`
  font-family: "Noto Sans KR", sans-serif;
  /* background-color: #222; */
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
  .ant-tabs-nav {
    justify-content: center;
    /* margin-top: 20%; */
  }

  .ant-tabs-tab {
    font-size: 20px;

    color: black;
    font-weight: bold;
    /* margin-left: 10px; */
  }

  .ant-tabs-content {
    width: 100%; // Set the width of the tab content
    /* margin: 0 auto; // Center the content */
    text-align: left;
  }
`;

const FlexContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;

  display: flex;
  justify-content: space-between;
  height: 20vh;
  margin-right: 13%;
  margin-left: 13%;
`;

const ImageContainer = styled.div`
  img {
    margin-top: 10%;
    width: 70px;
    height: auto;
  }
`;
const ButtonContainer = styled.div`
  text-align: left;
  h2 {
    font-size: 32px;
    color: (0, 0, 0, 0.65);
    font-weight: 400;
    white-space: nowrap;
  }
`;

const SecurityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40vh;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
`;
