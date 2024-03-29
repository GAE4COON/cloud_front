import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, TreeSelect, Checkbox } from "antd";

import { industrial, zoneSecurityReq, zoneRdsReq } from "../db/Requirement";

const { SHOW_PARENT } = TreeSelect;

function ZoneComponent({
  diagram,
  zone,
  industrial_BP,
  onDataChange,
  onRemoveZone,
}) {
  const [ZoneData, setZoneData] = useState([]); //Zone select에서 쓰기 위한 데이터
  const [zoneValue, setZoneValue] = useState([]); //Zone에 대한 private, public subnet 정보 list
  const [zoneNode, setZoneNode] = useState([]); //Zone에 대한 private, public subnet node 정보 list
  const [SelectZone, setSelectZone] = useState(null); //망 선택
  const [availableNode, setAvailableNode] = useState([]); //고가용성 - 트래픽 분산 선택
  const [serverNode, setServerNode] = useState([]); //고가용성 -  선택
  const [zoneFunc, setSelectedZoneFunc] = useState(null); //망 기능 선택
  const [zoneReqValue, setSelectedZoneReqValue] = useState([]); //요구사항 선택

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
      // console.log("Zone subnet", zonelist);

      const backupNode = [];
      const backupgroupNode = [];

      for (let idx = 0; idx < resultList.length; idx++) {
        console.log("resultList", resultList[idx]); // label : DEV , value : DEV 
        console.log("Group",GroupData);
        backupgroupNode[resultList[idx].label] = [];
        backupNode[resultList[idx].label] = [];

        //security 그룹 추출
        for (let i = 0; i < GroupData.length; i++) {
          if (typeof GroupData[i].group === "string") {
            const parts = GroupData[i].group.split(" "); // 공백을 기준으로 문자열 나누기
            if (parts.length > 0) {
                const firstElement = parts[0]; // 첫 번째 요소 가져오기
                console.log("첫 번째 요소:", firstElement);
                if (firstElement  === (resultList[idx].label)) {
                  backupgroupNode[resultList[idx].label].push(GroupData[i].key);
                }
            } else {
                console.log("문자열에 공백이 없습니다.");
            }
            
          }
        }
        // console.log("backupgroupNode: ", backupgroupNode);

        for (
          let i = 0;
          i < backupgroupNode[resultList[idx].label].length;
          i++
        ) {
          backupgroupNode[resultList[idx].label][i] = {
            value: backupgroupNode[resultList[idx].label][i],
            label: backupgroupNode[resultList[idx].label][i],
          };
        }

        const nodeSet = new Set();
        for (let i = 0; i < diagramData.nodeDataArray.length; i++) {
          let nodeData = diagramData.nodeDataArray[i];
          let backupValues = backupgroupNode[resultList[idx].label].map((item) => item.value);
        
          if (nodeData.isGroup === null && nodeData.key.includes("EC2")) {
            console.log("Security Group 있는 Ec2", nodeData);
            if (backupValues.includes(nodeData.group)) {
              nodeSet.add(nodeData.group);
            }
          }
          
        
          if (typeof nodeData.group === 'string' && !nodeData.group.includes("Security Group") && nodeData.key.includes("EC2")) {
           
            if(nodeData.group.includes(resultList[idx].value)){
              nodeSet.add(nodeData.key);
            }
            
          }
        }

        const nodeSetList = Array.from(nodeSet);
        backupNode[resultList[idx].label] = nodeSetList;
        
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
        zoneFunc,
        availableNode,
        serverNode,
        zoneReqValue,
        zones,
      });
    };
    updateTossPopup();
  }, [availableNode,serverNode, zoneFunc, zoneReqValue, SelectZone, zones]);
  //여기에 상위props로 보낼 것 다 넣어주세요.

  const resetFields = () => {
    setAvailableNode([]); // Resetting High Availability
    setServerNode([]);
    setSelectedZoneFunc(null); // Resetting Selected Zone Function
    setSelectedZoneReqValue([]); // Resetting Selected Zone Requirements
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectZone(value);
    resetFields();
  };

  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
    setAvailableNode(value);
  };
  const handleChange2 = (value) => {
    console.log(`selected ${value}`);
    setServerNode(value);
  };

  const handleZoneFuncChange = (value) => {
    setSelectedZoneFunc(value);
    // Additional logic if needed
  };

  const handleZoneReqValueChange = (value) => {
    setSelectedZoneReqValue(value); // Corrected this line
    // Additional logic if needed
  };

  const updateZone = (zoneId, key, value) => {
    setZones(
      zones.map((zone) =>
        zone.id === zoneId ? { ...zone, [key]: value } : zone
      )
    );
  };

  const removeCurrentZone = () => {
    onRemoveZone(zone.id);
  };

  return (
    <ZoneContainer key={zone.id}>
      <ZoneCloseButton onClick={removeCurrentZone}>✖</ZoneCloseButton>

      <SelectContainer>
        <SelectTitle>망 이름</SelectTitle>
        <StyledSelect
          showSearch
          // onChange={handleZoneNameChange}
          value={SelectZone}
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
          value={zoneFunc}
          onChange={handleZoneFuncChange}
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
          options={industrial_BP}
        />
      </SelectContainer>

      <SelectContainer>
        <SelectTitle>트래픽 분산(ALB)</SelectTitle>
        <StyledBackupSelect
          mode="tags"
          showSearch
          value={availableNode}
          onChange={handleChange1}
          placeholder="node select..."
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
      </SelectContainer>

      <SelectContainer>
        <SelectTitle>서버 수 조절 (AutoScaling)</SelectTitle>
          <StyledBackupSelect
            mode="tags"
            showSearch
            value={serverNode}
            onChange={handleChange2}
            placeholder="node select..."
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
      </SelectContainer>

      <SelectContainer>
        <SelectTitle>고가용성</SelectTitle>
          <Checkbox.Group options={zoneRdsReq} onChange={handleZoneReqValueChange} />
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

const StyledBackupSelect = styled(Select)`
  width: 80%;
  text-align: left;
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
