import SideBar from "../components/MyPageSideBar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { DownOutlined } from '@ant-design/icons'

import { Space, Dropdown, Button } from "antd";
import "../styles/MyCloud.css";
import styled from "styled-components";

import { myNetworkDB } from "../apis/myPage";

const MyCloud = () => {
    // const [cloudInstances, setCloudInstances] = useState([
    //     { title: "도식화1", key: 1, imgSrc: '/assets/img/Cloud-architecture.png' },
    //     { title: "도식화2", key: 2, imgSrc: '/assets/img/Cloud-architecture.png' },
    //     { title: "도식화3", key: 2, imgSrc: '/assets/img/Cloud-architecture.png' },
    //     { title: "도식화4", key: 2, imgSrc: '/assets/img/Cloud-architecture.png' },
    // ]);
    const [cloudInstances, setCloudInstances] = useState([]);

    useEffect(() => {
        const fetchMyNetwork = async () => {
            const myNetwork = await myNetworkDB("1");
            setCloudInstances(myNetwork.data);
        };

        fetchMyNetwork();
    }, []);

    // This function splits the cloudInstances array into chunks of 3
    const getRows = (instances) => {
        const rows = [];
        instances.forEach((instance, idx) => {
            if (idx % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(instance);
        });
        return rows;
    };

    return (
        <div className="mypage-container">
            <div className="flex-container">
                <div className="menu-container">
                    <SideBar />
                </div>

                <div className="main-container">
                    <StyledSideMenuTitle>
                        도식화 히스토리
                    </StyledSideMenuTitle>
                    {getRows(cloudInstances).map((row, idx) => (
                        <div key={idx} className="cloud_instance_row">
                            {row.map((instance) => (
                                <div key={instance.key} className="cloud_instance">
                                    <img className="diagram_img" alt="diagram_img" src={instance.imgSrc} />
                                    <StyledInstanceTitle>
                                        {instance.title}
                                    </StyledInstanceTitle>

                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MyCloud;

const StyledButton = styled(Button)`
    min-width: 100px;
    margin: 5px;
    color: white;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    border-radius:20px;

    /* text-align: left; */
`
const StyledSideMenuTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
`

const StyledInstanceTitle = styled.div`
font-family: "Noto Sans KR", sans-serif !important;
  /* font-weight: 500; */
  /* font-size: 20px; */
  text-align: left;
  margin: 20px;
  
`