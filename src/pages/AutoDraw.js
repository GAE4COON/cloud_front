import React from "react";
import "../styles/inputNetwork.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/App.css";
import { useFileUpload, useFileDownload } from "../components/useFileInput"; // 위에서 작성한 훅들을 해당 경로로 임포트

const AutoDraw = () => {
  const { selectedFile, handleInputFIleUpload, uploadFileFormat } =
    useFileUpload();

  const downloadExcel = useFileDownload(
    "/assets/template/templateExcel.xlsx",
    "templateExcel.xlsx"
  );
  const downloadJson = useFileDownload(
    "/assets/template/templateJson2.json",
    "templateJson.json"
  );

  return (
    <div className="main-content">
      <AutoBackground>
        <div className="description_type" style={{marginTop:"100px"}}>
          <div className="upper_type">
            <div className="excel_type" >
              <div className="title_type">Excel</div>
              <div className="description">
                <p>온디맨드 정보 자산을 업로드 해주세요.</p>
                <br />
                <p>First</p>
                <p>
                  입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가
                  수정할 수 있습니다.
                </p>
                <br />
                <p>Second</p>
                <p>
                  네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수
                  있습니다.
                </p>
              </div>
              <button className="template_button" onClick={downloadExcel}>
                템플릿 받으러가기
              </button>
            </div>
          </div>
          <div className="upper_type">
            <div className="json_type">
              <div className="title_type">JSON</div>
              <div className="description">
                <p>온디맨드 정보 자산을 업로드 해주세요.</p>
                <br />
                <p>First</p>
                <p>
                  입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가
                  수정할 수 있습니다.
                </p>
                <br />
                <p>Second</p>
                <p>
                  네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수
                  있습니다.
                </p>
              </div>
              <button className="template_button" onClick={downloadJson}>
                템플릿 받으러가기
              </button>
            </div>
          </div>
        </div>

        <div className="file-upload-container">
          <div className="upload-box">
            {selectedFile ? selectedFile.name : "Asset Upload(.xlsx, .json)"}
          </div>
          <label htmlFor="customFileUpload" className="custom-file-label">
            Upload
          </label>
          <input
            type="file"
            id="customFileUpload"
            className="custom-file-input"
            onChange={uploadFileFormat}
            accept=".xlsx, .xls, .json"
          />
        </div>

        <StyledButton onClick={handleInputFIleUpload}>Submit</StyledButton>
      </AutoBackground>
    </div>
  );
};
export default AutoDraw;

const AutoBackground = styled.div`


margin-top: 50px;
justify-content: center;
width: 100%;
height: 100vh;
  background-color: #EDF3FF;
  margin: 0 auto;
    /* 중앙 정렬을 위한 스타일 */
    display: flex;
    flex-direction: column;
    align-items: center;
  `

const StyledButton = styled.div`
  margin-top: 10px;
  box-sizing: border-box;
  position: relative;
  width: 100px;
  padding: 5px;

  background: #ffffff;
  border: 1px solid #bababa;
  border-radius: 7px;

  font-family: "Noto Sans KR", sans-serif !important;
  font-style: normal;
  font-weight: 700;

  line-height: 30px;
  align-items: center;
  text-align: center;

  color: #809cda;
  cursor: pointer;

  &:hover {
    background: #809cda;
    color: #ffffff;
  }
`;
