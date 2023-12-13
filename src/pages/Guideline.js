import React, { useState, useEffect } from "react";
import "../styles/App.css";
import styled from "styled-components";
import Sidebar from "../components/MyPageSideBar";
//import ManageHuman from "../components/security/ManageHuman";
import Migration from "../components/security/Migration";
// import { PDFDownloadLink } from "@react-pdf/renderer"; // react-to-pdf의 PDFDownloadLink 가져오기

//import { PDFViewer } from '@react-pdf/renderer';

function Guideline() {
  const handleDownload = (filelink, filename) => {
    const link = document.createElement("a");
    link.href = filelink;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isManage, setIsManage] = useState(false);

  let keyword;
  keyword = "Manage";
  useEffect(() => {
    setIsManage(keyword === "Manage");
  });

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <Sidebar />
          </div>
          <div className="main-container">
            <Title> Migration </Title>
        

      {isManage && (
              <>
                <Button
                  onClick={() =>
                    handleDownload(
                      "/assets/pdf/ManageHuman2.pdf",
                      "Migration.pdf"
                    )
                  }
                >
                  Download
                  <img
                    src="/assets/img/pdf2.png"
                    alt="Download Icon"
                    style={{ width: "20px", marginLeft: "5px" }}
                  />{" "}
                  {/* 이미지 추가 */}
                </Button>
              </>
            )}


            <ResourceContainer>
              {isManage && (
                <>
                  <Migration />
                </>
              )}
            </ResourceContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guideline;

const Button = styled.div`
  color: black; /* 버튼 텍스트 색상 */

  width: 13%;
  float: right;
  margin-right: 50px;
  margin-bottom: 20px;

  padding: 1px 2px; /* 상하, 좌우 패딩 */
  border: none; /* 테두리 없음 */
  border-radius: 3px; /* 테두리 둥글기 */
  cursor: pointer; /* 마우스 오버시 커서 변경 */
  font-size: 13px; /* 텍스트 크기 */
  transition: all 0.3s ease 0s; /* 호버 효과를 위한 전환 */

  &:hover {
    color: #1a66cc;
  }

`

const MypageContainer = styled.div`
  display: flex;
  font-family: "Noto Sans KR", sans-serif !important;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border-radius: 8px; /* 모서리 둥글게 처리 */
  background: #FFFFFF; /* 배경색 설정 */

`;

const ResourceContainer = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
  justify-content: center;
  max-height: 70vh;

  position: relative;
  padding-left: 40px;
  padding-right: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border-radius: 8px; /* 모서리 둥글게 처리 */
  background: #ffffff; /* 배경색 설정 */
  justify-content: center;
  margin: auto;
  height: auto;

  overflow-x: auto;

  scrollbar-color: darkgrey;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: #0000ff; /* 단색 배경 */
    box-shadow: inset 2px 2px 5px 0 rgba(255, 255, 255, 0.5);
  }
`;

const Title = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;
