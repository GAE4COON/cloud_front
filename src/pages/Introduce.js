import React, { useEffect, useRef } from "react";
import "../styles/Introduce.css";
import { Tabs } from "antd";
import styled from "styled-components";

const useIntersectionObserver = (ref) => {
  const [intersectionRatio, setIntersectionRatio] = React.useState(0);

  useEffect(() => {
    const target = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        setIntersectionRatio(entries[0].intersectionRatio);
      },
      { threshold: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [ref]);

  return intersectionRatio;
};

const ContentBlock = ({
  bgColor,
  summaryText,
  securityText,
  textColor = "white",
}) => (
  <div
    style={{
      backgroundColor: bgColor,
      margin: "15px",
      fontSize: "40px",
      borderRadius: "10px",
    }}
    className="content-block"
  >
    <p style={{ color: textColor, fontSize: "24px" }}>{summaryText}</p>
    <p style={{ color: textColor, fontSize: "20px" }}>{securityText}</p>
  </div>
);
const LogoSection = () => {
  const logoSectionRef = useRef(null);
  const intersectionRatio = useIntersectionObserver(logoSectionRef);

  return (
    <div
      className="logo-container"
      ref={logoSectionRef}
      style={{ opacity: intersectionRatio }}
    >
      <div className="content">
        <img src="assets/img/introducelogo.png" alt="logo" />
        <p>
          'CLOUD MAESTRO'는 보안 전문가들로 구성된 팀, 'GAE4COON'입니다.
          <br />
          클라우드 마이그레이션 이전 단계에서{" "}
          <span className="highlight">ISO 27001</span>을 기반으로 <br />
          <span className="highlight">보안성을 고려한 아키텍처 도식화</span>를
          제공합니다.
        </p>
      </div>
    </div>
  );
};

const TabSection = () => {
  const TabSectionRef = useRef(null);
  const intersectionRatio = useIntersectionObserver(TabSectionRef);

  return (
    <div
      className="container2"
      ref={TabSectionRef}
      style={{ opacity: intersectionRatio }}
    >
      <StyledTabs>
        <Tabs.TabPane tab="Cloud Migration이란?" key="1">
          온프레미스의 정보자산을 Cloud 환경으로 이전하는 과정
        </Tabs.TabPane>
        <Tabs.TabPane tab="클라우드 보안의 Rehost란?" key="2">
          ISO 27001 is an international standard for Information Security
          Management Systems (ISMS). It provides a framework for establishing,
          implementing, maintaining, and continually improving an ISMS within
          the context of an organization's overall business risks. The standard
          outlines a risk management process and specifies a set of controls
          that organizations can implement to secure their information assets.
        </Tabs.TabPane>
        <Tabs.TabPane tab="ISO 27001이란?" key="3">
          ISO 27001 is an international standard for Information Security
          Management Systems (ISMS). It provides a framework for establishing,
          implementing, maintaining, and continually improving an ISMS within
          the context of an organization's overall business risks. The standard
          outlines a risk management process and specifies a set of controls
          that organizations can implement to secure their information assets.
        </Tabs.TabPane>
      </StyledTabs>
    </div>
  );
};

const ImageSection = () => {
  const IMGSectionRef1 = useRef(null);
  const IMGSectionRef2 = useRef(null);

  const intersectionRatio1 = useIntersectionObserver(IMGSectionRef1);
  const intersectionRatio2 = useIntersectionObserver(IMGSectionRef2);

  return (
    <>
      <div
        className="img"
        ref={IMGSectionRef1}
        style={{ opacity: intersectionRatio1 }}
      >
        <ImageWithCaption
          src="/assets/img/input.png"
          alt="input_img"
          caption="On Premise"
        />
      </div>

      <div
        className="img"
        ref={IMGSectionRef2}
        style={{ opacity: intersectionRatio2 }}
      >
        <ImageWithCaption
          src="/assets/img/output.png"
          alt="output_img"
          caption="After Migration"
        />
      </div>
    </>
  );
};

const ImageWithCaption = ({ src, alt, caption }) => {
  const imageRef = useRef(null);

  useIntersectionObserver(imageRef, () => {
    console.log("Image is in view!");
  });

  return (
    <>
      <img src={src} alt={alt} className="box-shadow" />
      <p className="text">{caption}</p>
    </>
  );
};

const ContentSection = () => {
  const ContentSectionRef = useRef(null);

  const intersectionRatio = useIntersectionObserver(ContentSectionRef);

  return (
    <>
      <div
        className="content-dummy"
        ref={ContentSectionRef}
        style={{ opacity: intersectionRatio }}
      >
        <div className="Excels">
          <div id="Excels-left" />
          <div className="container5">
            <ContentBlock
              bgColor="rgba(59, 108, 125, 0.8)"
              summaryText="보안성을 고려한 클라우드..."
              securityText="보안 기능"
            />
            <ContentBlock
              bgColor="rgba(59, 108, 125, 0.2)"
              summaryText="보안성을 고려한 클라우드..."
              securityText="성능 최적화"
              textColor="black"
            />
            <ContentBlock
              bgColor="rgba(59, 108, 125, 0.8)"
              summaryText="보안성을 고려한 클라우드..."
              securityText="비용 최적화"
            />
          </div>
          <div id="Excels-right" />
        </div>
      </div>
    </>
  );
};

const Home = () => (
  <div>
    <LogoSection />
    <TabSection />
    <ImageSection />
    <ContentSection />
  </div>
);

export default Home;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    justify-content: center;
  }

  .ant-tabs-tab {
    font-size: 20px;
    width: 33vh;
    justify-content: center;
    align-items: center;
    color: black;
    font-weight: bold;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  font-size: 17px;
`;
