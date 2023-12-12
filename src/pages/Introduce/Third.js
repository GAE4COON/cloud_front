import React, { useEffect , useState} from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import "../../styles/Introduce.css";

export default function Third() {
  
  const [jsonData, setJsonData] = useState(null);

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/json/network.json');
        const filejson = await response.json();
        console.log("filejson" ,filejson);
        setJsonData(filejson); // Store the JSON data in state
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchData();
     
  },[])


  return (
    <div className="about-container">
<ThirdContainer>
        <CloudContainer>
            <IntroduceContainer ref={imageRef} inView={imageInView}>
            <IntroduceImageContainer ref={imageRef} inView={imageInView} width="50%">
                    <img src="/assets/introduce_img/isorogo.png" alt="logo" />
                </IntroduceImageContainer>
            </IntroduceContainer>
        </CloudContainer>
        <CloudContainer>
            <IntroduceContainer ref={imageRef} inView={imageInView}>
                <TextTitleContent>
                ISO/IEC 27001은 국제적으로 통용되는<br/> 정보보호 관리 시스템에 대한 표준이자 인증기준입니다.
                </TextTitleContent>
                <TextContent>
                ISO/IEC 27001의 구성은 조직, 리더십, 계획, 지원, 운영, 이행 평가, 개선으로 이루어져 있어 조직적 관점에서의 보안 정책 수립과 이를 적절히 수행시키기 위한 종사자의 책임과 역할, 보안 위험 평가 및 처리, 정보 자산 관리에 대한 지원 프로세스 명확화, 보안 정책에 대한 평가와 지속적인 개선 등 기업의 전반적인 보안 프로세스 정착을 위한 기준을 제시하고 있습니다
                </TextContent>
            </IntroduceContainer>
        </CloudContainer>
    

        <CloudContainer>

                <ImageContainer width="120%">
                    <img src="/assets/introduce_img/iso.png" alt="logo" />
                </ImageContainer>
                <IntroduceContainer >
                <TextContent>
                ISO/IEC 27001에 대한 세부 이행 지침으로 ISO/IEC 27002을 두어 독자에게 더욱 직관적인 이해가 가능하도록 하고 있으며, ISO/IEC 27017을 통한 클라우드 환경에 대한 추가/확장 이행 지침, ISO/IEC 27018을 통한 클라우드 환경 내에서 PII(개인식별정보)의 관리 방안을 제시하고 있습니다.
                </TextContent>
                <TextContent>
                ISO/IEC 27001은 정보보호와 관련하여 전세계적으로 가장 많은 기업이 취득하고 있는 인증이며, EU의 GDPR과 국내의 ISMS를 비롯한 각국의 보안인증제도가 이 ISO/IEC 27001를 기반으로 재설계되어 체계를 갖추어 가고 있습니다.
                On Cloud는 다양한 보안 인증의 기준이 되는 ISO/IEC 27001을 준수한 아키텍처 및 가이드를 제공함으로써, 다양한 보안 인증에 대한 접근성과 확장성을 열어 놓았습니다.
                다양한 컴플라이언스 요구사항에 발빠르게 대응해나가기 위한 On Cloud의 첫번째 스텝으로써 ISO/IEC 27001을 준수하고 있습니다.

                </TextContent>
                
            </IntroduceContainer>
   
        </CloudContainer>
</ThirdContainer>    


    </div>
  );
}

const ThirdContainer = styled.div`
  margin-left: 20%;
  margin-right: 20%;
`


const TextContent = styled.p`
font-size: 19px;
font-weight: 500;
`

const GradientTextContent = styled.span`
  background-image: linear-gradient(to right, #00B0F0, #0070C0, #002060);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 24px;
  font-weight: 900; /* Adjust font weight as needed */
`
const TextTitleContent = styled.h2`
`

const fadeIn = css`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  animation: fadeIn 1s ease-out forwards;
`;

const CloudContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // Centers children horizontally in the container
    justify-content: center; // Centers children vertically in the container
    margin-top: ${props => props.marginTop};
  // Remove 'item-align' as it's not a valid CSS property

  // Add more styling as needed
`;
const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px; // Adjust as needed
  /* padding: 20px; // Adjust as needed */
  /* width:60%; */
 
  font-family: "Noto Sans KR", sans-serif !important;

  h2 {
    font-size: 2em; // Adjust as needed
    margin-bottom: 10px; // Adjust as needed
  }
  div {
    margin-top: 5%; // You already have this inline, but it can be included here for consistency
  }
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  
`;

const IntroduceImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // Adjust as needed

  img {
    width: 80%;
    /* max-width: ${props => props.width || '40%'}; */
    height: auto; // Ensures the image maintains its aspect ratio
    // Add any additional styling for the image
  }

  // Add any additional styling for the container
`;

const ImageContainer = styled.div`
${({ inView }) => inView && fadeIn}
text-align:center;
    img {

        width: 100%;
      }
    flex: 1;
    /* margin-left:20%; */
    margin: 5%;

`;
const TextContainer = styled.div`
${({ inView }) => inView && fadeIn}
    text-align: left;
    flex:1;
    font-size: 18px; // Adjust as needed
    h2{
    color:(0,0,0,.65);
    font-weight:400;
    white-space:nowrap;
    /* margin-top: 40%; // Add top margin if needed, adjust as necessary */
    margin-bottom: 20px; // Space below the h2, adjust as necessary
    }
    /* margin-right:10%; */

`;