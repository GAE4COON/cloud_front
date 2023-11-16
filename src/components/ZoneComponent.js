import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, TreeSelect } from "antd";

import { industrial, globalRequest, zoneRequest } from "../db/Requirement";

const { SHOW_PARENT } = TreeSelect;

function ZoneComponent({ diagram, zone, onDataChange }) {
  const [ZoneData, setZoneData] = useState([]); //Zone select에서 쓰기 위한 데이터
  const [zoneValue, setZoneValue] = useState([]); //Zone에 대한 private, public subnet 정보 list
  const [zoneNode, setZoneNode] = useState([]); //Zone에 대한 private, public subnet node 정보 list
  const [SelectZone, setSelectZone] = useState([]); //망 선택
  const [selectBackup1, setSelectBackup1] = useState([]);
  const [selectBackup2, setSelectBackup2] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const diagramDataStr = diagram.model.toJson();
    const diagramData = JSON.parse(diagramDataStr);
    const GroupData = [];
    try {
      for (let i = 0; i < diagramData.nodeDataArray.length; i++) {
        let nodeData = diagramData.nodeDataArray[i];
        if (nodeData.isGroup === true) {
          GroupData.push(nodeData);
        }
      }
      console.log(GroupData);
      const result = new Set();
      const zonelist = [];
      GroupData.forEach((item) => {
        if (typeof item.key === "string") {
          const match = item.key.match(
            /^(.*?)\s*(Private subnet|Public subnet)/
          );
          if (match && match[1]) {
            result.add(match[1].trim());
            zonelist.push(item.key);
          }
        }
      });

      const resultList = Array.from(result); // Set을 배열로 변환
      for (let i = 0; i < resultList.length; i++) {
        resultList[i] = {
          value: resultList[i],
          label: resultList[i],
        };
      }
      setZoneData(resultList);
      setZoneValue(zonelist);
      console.log("Zone", resultList);
      console.log("Zone subnet", zonelist);

      const backupNode = [];
      const backupgroupNode = [];

      for (let idx = 0; idx < resultList.length; idx++) {
        console.log(resultList[idx]);
        backupgroupNode[resultList[idx].label] = [];
        backupNode[resultList[idx].label] = [];

        for (let i = 0; i < zonelist.length; i++) {
          if (zonelist[i].includes(resultList[idx].label)) {
            backupgroupNode[resultList[idx].label].push(zonelist[i]);
          }
        }

        console.log("test group", backupgroupNode);

        //security 그룹 추출
        for (let i = 0; i < GroupData.length; i++) {
          if (typeof GroupData[i].group === "string") {
            if (GroupData[i].group.includes(resultList[idx].label)) {
              backupgroupNode[resultList[idx].label].push(GroupData[i].key);
            }
          }
        }
        console.log("backupgroupNode: ", backupgroupNode);

        for (let i = 0; i < diagramData.nodeDataArray.length; i++) {
          let nodeData = diagramData.nodeDataArray[i];
          if (typeof nodeData.group === "string" && nodeData.isGroup === null) {
            if (
              backupgroupNode[resultList[idx].label].includes(nodeData.group)
            ) {
              backupNode[resultList[idx].label].push(nodeData.key);
            }
          }
        }
        console.log("backupNode: ", backupNode);

        for (let i = 0; i < backupNode[resultList[idx].label].length; i++) {
          backupNode[resultList[idx].label][i] = {
            value: backupNode[resultList[idx].label][i],
            label: backupNode[resultList[idx].label][i],
          };
        }

        setZoneNode(backupNode);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const updateTossPopup = () => {
      onDataChange(zone.id, {
        SelectZone,
        selectBackup1,
        selectBackup2,
        zones,
      });
    };
    updateTossPopup();
  }, [selectBackup1, selectBackup2, SelectZone, zones]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    // const regex = /^([a-zA-Z]+)(\d+)$/;
    // const matches = value.match(regex);

    // if (matches) {
    //   const textPart = matches[1];
    //   const numberPart = parseInt(matches[2], 10);
    //setSelectZone([textPart, numberPart]);
    //console.log(`Text Part: ${textPart}, Number Part: ${numberPart}`);
    setSelectZone(value);
  };

  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
    setSelectBackup1(value);
  };

  const handleChange2 = (value) => {
    console.log(`selected ${value}`);
    setSelectBackup2(value);
  };

  const updateZone = (zoneId, key, value) => {
    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, [key]: value } : zone
      )
    );
  };

  const removeZone = (zoneId) => {
    setZones(zones.filter((zone) => zone.id !== zoneId));
  };

  //여기에 상위props로 보낼 것 다 넣어주세요.

  return (
    <ZoneContainer key={zone.id}>
      <ZoneCloseButton onClick={() => removeZone(zone.id)}>✖</ZoneCloseButton>

      <SelectContainer>
        <SelectTitle>망 이름</SelectTitle>
        <StyledSelect
          showSearch
          // onChange={handleZoneNameChange}
          onChange={handleChange}
          placeholder="Select Zone"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={ZoneData}
        />
      </SelectContainer>

      <SelectContainer>
        <SelectTitle>망 기능</SelectTitle>
        <StyledSelect
          showSearch
          onChange={(value) => updateZone(zone.id, "zoneFunc", value)}
          placeholder="Select Zone Function"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={industrial}
        />
      </SelectContainer>

      <SelectContainer>
        <SelectTitle>백업</SelectTitle>
        <BackupContainer>
          <BackupSelectTitle>중앙관리</BackupSelectTitle>
          <StyledBackupSelect
            mode="tags"
            showSearch
            onChange={handleChange1}
            placeholder="Static Backup"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={zoneNode[SelectZone]}
          />
          <BackupSelectTitle>일반</BackupSelectTitle>
          <StyledBackupSelect
            showSearch
            onChange={handleChange2}
            mode="tags"
            placeholder="Dynamic Backup"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={zoneNode[SelectZone]}
          />
        </BackupContainer>
      </SelectContainer>
      <SelectContainer>
        <SelectTitle>요구사항</SelectTitle>
        <StyledTreeSelect
          treeData={zoneRequest}
          value={zone.zoneReqValue}
          onChange={(value) => updateZone(zone.id, "zoneReqValue", value)}
          treeCheckable={true}
          showCheckedStrategy={SHOW_PARENT}
          placeholder="Please select"
        />
      </SelectContainer>
    </ZoneContainer>
  );
}

const ZoneContainer = styled.div`
  border-radius: 20px;
  border: 1px solid gray;
  margin: 20px;
  position: relative;
  padding-top: 20px;
`;

const ZoneCloseButton = styled.span`
  cursor: pointer;
  position: absolute; /* Changed to absolute */
  font-size: 15px;
  right: 10px;
  top: 10px;
`;

const BackupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackupSelectTitle = styled.div`
  width: 10%;
  text-align: left;
`;

const StyledBackupSelect = styled(Select)`
  width: 200px;
  text-align: left;
  margin-right: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  padding: 20px;
  margin-left: 50px;
  align-items: center;
`;

const SelectTitle = styled.div`
  width: 20%;
  text-align: left;
`;

const StyledSelect = styled(Select)`
  width: 80%;
  text-align: left;
`;
const StyledTreeSelect = styled(TreeSelect)`
  width: 80%;
  text-align: left;
  //
`;

export default ZoneComponent;