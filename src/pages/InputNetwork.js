import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 변경된 부분
import "../styles/inputNetwork.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const handleUpload = () => {
    if (selectedFile) {
      console.log("file", selectedFile);
      console.log("Uploading:", selectedFile.name);

      // 파일 전송
      const fd = new FormData();
      // fd.append("user upload file",file);
      fd.append("file", selectedFile);
      // Object.values(file).forEach((file) => fd.append("file", file));

      axios
        .post("http://localhost:8080/api/v1/file-api/upload", fd, {
          headers: {
            "Content-Type": `multipart/form-data; `,
          },
        })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
          // 예외 처리
        });

      console.log("upload!!");
      fetchJson();
    }
  };

  const fetchJson = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/file-api/json"
      );
      const jsonData = await response.json();
      setData(jsonData);
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching the JSON data:", error);
    }
  };

  const uploadFile = async (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFile(event.target.files);
      console.log(event.target.files);
      console.log(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const downloadExcel = () => {
    const url = "/assets/template/templateExcel.xlsx"; // Excel 파일의 경로
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "templateExcel.xlsx"); // 원하는 다운로드 파일명 지정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJson = () => {
    const url = "/assets/template/templateJson.json"; // Excel 파일의 경로
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "templateJson.json"); // 원하는 다운로드 파일명 지정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <div className="description_type">
        <div className="upper_type">
          <div className="excel_type">
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
                네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수 있습니다.
              </p>
            </div>
            <button className="template_button" onClick={downloadExcel}>
              템플릿 받으러가기
            </button>
            <div className="example">
              잘 모르겠다면?
              <Link
                to={"/learn"}
                state={{ type: "excel" }}
                className="example_link"
              >
                예시 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="upper_type">
          <div className="json_type">
            <div className="title_type">Json</div>
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
                네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수 있습니다.
              </p>
            </div>
            <button className="template_button" onClick={downloadJson}>
              템플릿 받으러가기
            </button>
            <div className="example">
              잘 모르겠다면?
              <Link
                to={"/learn"}
                state={{ type: "json" }}
                className="example_link"
              >
                예시 보기
              </Link>
            </div>
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
          onChange={uploadFile}
          accept=".xlsx, .xls, .json"
        />
      </div>

      <button className="submit-button" onClick={handleUpload}>
        {/* <Link to={'/draw/network'}
                    state={{ selectedFile }}> */}
        Submit
        {/* </Link> */}
      </button>
    </div>
  );
};
export default App;
