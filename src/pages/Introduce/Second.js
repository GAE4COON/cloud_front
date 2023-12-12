import React, { useEffect , useState} from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import "../../styles/Introduce.css";

export default function Second() {
  
  const [imageRef, imageInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="about-container">
      <SecondContainer ref={imageRef} inView={imageInView}>
        <CloudContainer>
            <IntroduceContainer >
                <TextTitleContent>클라우드 보안 꼭 필요할까 ? </TextTitleContent>
            </IntroduceContainer>
        </CloudContainer>
        <FlexContainer>
            <TextContainer>
                <TextContent>
                국내에선 2015년, 클라우드컴퓨팅 발전 및 이용자 보호에 관한 법률을 제정하고 2021년, 본격적인 디지털 뉴딜 정책 시행 등을 통해 
                클라우드 이용을 추진하고 있으며2017년, ISMS-P 인증 기반의 클라우드 서비스 보안인증 제도 설립을 통해 클라우드 보안 사고를 줄이기 위한 움직임 또한 지속적으로 취하고 있습니다.

                </TextContent>
            </TextContainer>
        
            <ImageContainer>
                <img src="assets/introduce_img/logo5.png" alt="logo" />
            </ImageContainer>
        </FlexContainer>

        <CloudContainer>
            <IntroduceContainer>
                <TextContent>
                    즉 클라우드 보안에 대한 국가적 관심이 높아지고 있으며,  <GradientTextContent>클라우드 보안은 선택이 아닌 필수</GradientTextContent>입니다.
                 </TextContent>
                 <TextTitleContent>클라우드 보안 사고는 왜 발생할까요?</TextTitleContent>

                
                 <TextContent>
                    <span style={{ fontWeight: 'bold' }}> 클라우드 보안 사고의 <span style={{ fontWeight: 'bold', fontSize: 'larger', color: 'red'  }}>99%</span>는 관리 과실로 발생 </span>
                    <br/>
                    <br/>
                    세계 최대의 정보기술 자문회사 Gartner에 따르면, 2025년까지 클라우드 보안사고의 99%는 사용자 과실에 의해 발생할 것임을 경고하고 있습니다.
                    2021년 개인정보보호위원회의 보도자료에 따르면, 유명 숙박 서비스 제공 기업을 비롯한 4개의 기업에서 관리자 접근권한을 IP로 제한하지 않아 외부 권한 탈취에 따른 개인정보 유출 및 제3자 열람이 가능하였던 사례가 존재합니다. 또한 비가용 자원의 정리가 이뤄지지 않았기에 추가적인 제재 조치가 발생하기도 했습니다.
                </TextContent>
                <TextTitleContent>어떻게 <GradientTextContent style={{color:"transparent", fontSize:"28px"}}>관리</GradientTextContent>해야 할까요?</TextTitleContent>
            </IntroduceContainer>
        </CloudContainer>
        <FlexContainer>
            <ImageContainer>
                <img src="assets/introduce_img/secondIcon.png" alt="logo" />
            </ImageContainer>
        </FlexContainer>

        <CloudContainer>
            <IntroduceContainer>
                <TextContent>클라우드 환경은 동적성과 비가시성이라는 특성을 가집니다. 가상에서 자원을 동작시키며 빠르게 변화하기에, 활성화된 리소스를 식별하고 정리하는 것에 대한 어려움이 존재할 수 밖에 없습니. 자산 관리의 어려움은 곧 사고 식별과 대응의 어려움으로도 이어지며, 불필요한 비용 발생 및 연쇄적인 보안 사고의 발생이 가능해지는 것입니다.</TextContent>
                <TextTitleContent>On Cloud를 통해 클라우드 환경에 빠르게 적응해보세요!</TextTitleContent>
            </IntroduceContainer>
        </CloudContainer>
        

        <FlexContainer>
            <TextContainer>
                <TextContent>
                On Cloud는 사전으로 보안성이 점검된 아키텍처를 제시합니다. 이를 통해 기업은 보안 사고 발생에 대한 우려를 줄일 수 있습니다                </TextContent>
            </TextContainer>
        
            <ImageContainer>
                <img src="assets/introduce_img/case1.png" alt="logo" />
            </ImageContainer>
        </FlexContainer>

        <FlexContainer>
            <ImageContainer>
                <img src="assets/introduce_img/case2.png" alt="logo" />
            </ImageContainer>
            <TextContainer>
                <TextContent>
                On Cloud는 다양한 가이드 기능을 제공합니다. 보안 권고 및 가이드를 통한 보안 전략 수립, 리소스 가이드를 통한 클라우드 관리 역량 향상으로 클라우드 환경에 대비할 수 있습니다.
              </TextContent>
            </TextContainer>
        </FlexContainer>
        </SecondContainer>
    </div>
  );
}

// CSS animations and styled components remain unchanged

const SecondContainer = styled.div`
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