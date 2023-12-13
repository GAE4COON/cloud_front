import SideBar from "../components/MyPageSideBar";
import React, { useState, useEffect } from "react";
import { Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "../styles/App.css";
import { Space, Dropdown, Button } from "antd";
import { Menu } from "antd";
import { useAuth } from "../utils/auth/authContext";
import jwtDecode from "jwt-decode";
import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";

import styled from "styled-components";
import { getDiagramData, myNetworkDB, deleteDiagramData } from "../apis/myPage";
import { useHistory } from 'react-router-dom';
message.config({
  top: 50,
  duration: 1,
});



const MyArchitecture = () => {
  const { Meta } = Card;

  const [cloudInstances, setCloudInstances] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  //const navigate = useNavigate();

  const navigateToPurchase = () => {
    navigate('/guideline');
  };

  

  const { user, setUser } = useAuth();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token");
      }
    } else {
      setUser(null);
    }
  }, [ACCESS_TOKEN]);

  useEffect(() => {
    const fetchMyNetwork = async () => {
      const myNetwork = await myNetworkDB();
      const sortedData = myNetwork.data.sort((a, b) => {
        return new Date(b.modifiedDate) - new Date(a.modifiedDate);
      });

      setCloudInstances(sortedData);
      console.log(sortedData);
    };

    fetchMyNetwork();
  }, []);

  const handleCloudInstance = async (key, path) => {
    const response = await getDiagramData(key);
    console.log("response.data", response.data);
    navigate(`${path}`, { state: { info: response.data, save: true } });
  };

  const confirm = async (key, e) => {
    const response = await deleteDiagramData(key);
    console.log("response.data", response.data);
    setCloudInstances(
      cloudInstances.filter((instance) => instance.key !== key)
    );

    message.success("도식화가 삭제되었습니다.");
  };

  function formatLocalDateTime(localDateTimeString) {
    // Parsing the original string to a Date object
    const date = new Date(localDateTimeString);

    // Extracting year, month, day, hours, and minutes
    const year = date.getFullYear().toString().slice(-2); // Extracting the last two digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Formatting to "YYYY/MM/DD HH:mm"
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  return (
    <MainContainer>
      <FlexContainer>
        <SidebarContainer>
          <SideBar />
        </SidebarContainer>

        <MainContent>
          <StyledSideMenuTitle>도식화 히스토리</StyledSideMenuTitle>
          <CloudInstanceRow>
            {cloudInstances.length > 0 ? (
              cloudInstances.map((instance) => {
                const dropdownItems = [
                  {
                    key: "1",
                    label: (
                      <button
                        onClick={() =>
                          handleCloudInstance(
                            instance.key,
                            "/mypage/diagram/security"
                          )
                        }
                      >
                        Security
                      </button>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <button
                        onClick={() =>
                          handleCloudInstance(
                            instance.key,
                            "/mypage/diagram/resource"
                          )
                        }
                      >
                        Resource
                      </button>
                    ),
                  },
                  {
                    key: "3",
                    label: (
                      <button onClick={navigateToPurchase}>
                      Migration
                    </button>
                    ),
                  }
                ];
                return (
                  <CloudInstance key={instance.key}>
                    <Popconfirm
                      title="도식화 삭제"
                      description={`${instance.title} 도식화를 삭제하시겠습니까?`}
                      onConfirm={() => confirm(instance.key)}
                      cancelText="No"
                      okText="Yes"
                      placement="right"
                    >
                      {/* <CloseOutlined
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                            }}
                          />{" "} */}

                      <Button
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                        type="text"
                        shape="circle"
                        icon={<CloseOutlined />}
                      />
                    </Popconfirm>

                    <CloudInstanceImg
                      onClick={() =>
                        handleCloudInstance(instance.key, "/draw")
                      }
                      alt="diagram_img"
                      src={`https://cm-user-file.s3.ap-northeast-2.amazonaws.com/${instance.title}_${user.sub}.png?version=${new Date().getTime()}`}
                    />
                    <CloudInstanceETC>
                      <InstanceInformation>
                        <Tooltip placement="right" title={instance.title} showArrow={false} overlayStyle={{ maxWidth: '500px' }}>

                          <StyledInstanceTitle>
                            {instance.title}
                          </StyledInstanceTitle>
                        </Tooltip>

                        <StyledInstanceDate>
                          {instance.modifiedDate != instance.createdDate &&
                            <>수정 시간: {formatLocalDateTime(instance.modifiedDate)}</>

                          }
                          <br />
                          생성 시간: {formatLocalDateTime(instance.createdDate)}
                        </StyledInstanceDate>
                      </InstanceInformation>
                      <ButtonContainer>


                        <StyledButton
                          style={{ backgroundColor: "#5280DD" }}
                          onClick={() =>
                            handleCloudInstance(
                              instance.key,
                              "/mypage/diagram/summary"
                            )
                          }
                        >
                          Total Cost
                        </StyledButton>

                        <Dropdown
                          overlay={<Menu items={dropdownItems} />}
                          placement="bottomLeft"
                        >
                          <StyledButton
                            style={{ backgroundColor: "#FD754A" }}
                          >
                            Guide
                            <DownOutlined style={{ marginTop: "5px" }} />
                          </StyledButton>
                        </Dropdown>
                      </ButtonContainer>
                    </CloudInstanceETC>
                  </CloudInstance>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p>도식화 히스토리가 없습니다.</p>
              </div>
            )}
          </CloudInstanceRow>
        </MainContent>
      </FlexContainer>
    </MainContainer>
  );
};

export default MyArchitecture;
const StyledInstanceDate = styled.div`

  font-family: "Noto Sans KR", sans-serif !important;
  text-align: left;
  font-size: 11px;
  `;

const SidebarContainer = styled.div`
`;
const MainContent = styled.div`
    margin-top: 10px;
    flex:1;
    `;
const FlexContainer = styled.div`
  display: flex;
  `;

const CloudInstanceETC = styled.div`
  display: flex;
  flex-direction: row; // 가로 방향으로 요소를 배열
  /* align-items: center; // 세로 축 중앙 정렬 */
  justify-content: space-between; // 요소 사이의 공간을 균등하게 배분
  /* width: 100%; // 전체 너비를 사용 */
  flex-wrap: wrap; // 필요한 경우 요소를 다음 줄로 넘김
  padding: 20px;
`;

const CloudInstanceImg = styled.img`
  /* margin-top: 30px; */
  width: 100%;
  height: 60%;
  object-fit: contain;
  cursor: "pointer";
  border-radius: 5px 5px 0px 0px;
  border: 1px solid #e8e8e8;
`;

const CloudInstance = styled.div`
  width: 30%; // Adjust the width to fit 3 instances per row
  height: 300px;
  /* border: 1px solid gray; */
  border-radius: 5px;
  flex-direction: column; // 화면이 작을 때 세로 방향으로 쌓음
  @media (min-width: 720px) {
    flex-direction: row; // 화면이 600px 이상일 때 가로 방향으로 배치
  }
  box-shadow: 1px 1px 1px 1px rgb(235, 235, 235);
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
`;

const CloudInstanceRow = styled.div`
  margin: 20px;
  display: flex;
  justify-content: flex-start; // 시작 부분부터 아이템 배치
  flex-wrap: wrap; // 화면 크기에 따라 아이템을 줄바꿈
  gap: 10px; // 아이템 간 간격
`;

const StyledButton = styled(Button)`
  min-width: 80px;
  align-items: center;
  font-size: 12px;
  margin-bottom: 5px;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  font-family: "Noto Sans KR", sans-serif !important;
  /* text-align: left; */
`;

const ButtonContainer = styled.div`
  /* align-items: end; */
  display: flex;
  flex-direction: column;
  align-items: flex-end; // 오른쪽 정렬
  flex-grow: 0;
  flex: 0;
`;

const StyledSideMenuTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
  margin-top: 30px;
`;

const StyledInstanceTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 10px;
  position: relative;
  z-index: 2;
  background-color: white;

`;



const InstanceInformation = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  text-align: left;
  flex-grow: 1;
  flex-direction: column;
  flex: 1;
  white-space: nowrap;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  min-height: 100vh;
  padding-left:10%;
  padding-right: 10%;
  margin-bottom: 30px;
`;

const MyPageContainer = styled.div`
`
