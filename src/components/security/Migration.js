import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';





function Migration(){
 
    let summary = ' AWS Database Migration Service는 각종 데이터베이스를 AWS로 빠르고 안전하게 데이터베이스를 마이그레이션할 수 있도록 지원하는 서비스로, 최소한의 가동 중단으로 진행 중인 변경 내용을 버복제할 수 있다는 장점을 가지고 있다. ' ;
   
    

    let summary5 = ` DMS 마이그레이션은 마이그레이션할 데이터베이스 검색, 자동 스키마 변환, 복제 인스턴스, 원본 및 대상 엔트포인트, 복제 작업의 다섯 가지 구성 요소로 구성된다.
    `;
    let summary3 = ` 1. DMS는 SQL 서버, MySQL 서버, 오라클 및 Postgre SQL 데이터베이스를 지원한다.`;
    let summary4 = `2.  DMS 스키마 변환을 사용하면, 데이터베이스 마이그레이션을 좀 더 유연하게 가능하도록 도움을 준다 `;
    let summary6 = `3. AWS DMS 복제 인스턴스는 50GB 또는 100GB의 데이터 스토리지와 함께 제공된다 . `;
    let summary7 = `4. 포인트 유형, 엔진 유형, 서버 이름, 포트, 암호화를 넣어 엔트포인트를 생성하여 대상 데이터 스토어에 접근한다.`;

 

  
  

    return (
        <div>
             
              <div id="divToPrint">
              <ResourceContainer>
                  <Title>1. AWS Database Migration Service (DMS) </Title>
                  <Summary> { summary}</Summary>

                  <SemmiTitle>A. DMS 특징 </SemmiTitle>
                  <SemmiSummary>{ summary5 }</SemmiSummary> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary3 }</SemmiSummary2> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary4 }</SemmiSummary2> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary6 }</SemmiSummary2> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary7 }</SemmiSummary2> {/* 여기를 수정했습니다 */}


                  <SemmiTitle>B. MySQL DB Migration 방법  </SemmiTitle>
                  <SemmiSummary4>1. RDS를 생성한다.  </SemmiSummary4> {/* 여기를 수정했습니다 */}
                  <SemmiSummary3>   Migration이 되어질 DB를 생성을 한다. 데이터베이스의 방식을 선택을 하며 DB 인스턴스 이름을 설정을 해주고, DB 기본 User의 ID / PW를 지정해준다 .
그 후 VPC 그룹과 보안 그룹을 지정해준다.  RDS를 생성을 했다면, EC2 인스턴스에서 RDS에 접속을 하여 초기 DB 상태를 확인한다. </SemmiSummary3> {/* 여기를 수정했습니다 */}
                 
                  <SemmiSummary4>2. 서브넷 그룹을 생성한다.    </SemmiSummary4> {/* 여기를 수정했습니다 */}
                  <SemmiSummary3> DMS 콘솔에 들어가서 서브넷 그룹에 들어가 서브넷 그룹을 생성을 한다. 존재하는 퍼블릭 서브넷을 선택을 하고 서브넷 그룹을 선택을 한다. 이때 서브넷을 꼭 Internet Gateway를 통해 외부와 접속을 해야 한다. 
                    </SemmiSummary3>
              </ResourceContainer>
            </div>
        </div>
    );
  }


export default Migration;






const ResourceContainer = styled.div`

  display: flex; /* Flexbox 모델 적용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
`;




const Overview = styled.div`
  position: relative; /* 가상 요소의 위치 기준점 설정 */
  color: #525252;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  padding: 10px;


 
`;

const Title = styled.div`
position: relative; /* 가상 요소의 위치 기준점 설정 */
padding-top: 20px;
color: #525252;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-align: left;

&::after { /* 가상 요소를 이용하여 밑줄 대신 사용할 선 추가 */
  content: ''; 
  position:absolute; 
  left: 0; 
  bottom: -10px; 
  width: 100%;
  height: 1px; 
  background-color: #525252; 
  }
  
`;


const Summary = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;

  padding-left:10px;
  
`;

const SemmiTitle = styled.div`
position: relative; /* 가상 요소의 위치 기준점 설정 */
padding-top: 20px;
padding-left: 10px;
color: #525252;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-align: left;

`;

const SemmiSummary = styled.div`    

    padding-top: 20px;
    padding-left: 20px;
    color: #525252;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;

`;

const SemmiSummary2 = styled.div`    

    padding-top: 5px;
    padding-left: 20px;
    color: #525252;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;

`;

const SemmiSummary3 = styled.div`    

    padding-top: 10px;
    padding-left: 30px;
    color: #525252;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;

`;

const SemmiSummary4 = styled.div`    

    padding-top: 10px;
    padding-left: 30px;
    color: #525252;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
    font-weight: 700;

`;
const TableContainer = styled.div`
    padding-left: 20px;
    
  /* Additional styles if needed */
`;
const StyledTable = styled(Table)`

    font-size: 0.7em;
    padding: 2px; // 줄이고자 하는 패딩 값
    .ant-table-cell {
        white-space: normal !important;
        word-wrap: break-word !important;
      }
  
    .ant-table-thead > tr > th {
      background-color: #f2f2f2;
      color: #333;
      padding: 4px; // 줄이고자 하는 패딩 값
      font-size: 12px; // 줄이고자 하는 글자 크기
      text-align: center;
      font-weight: bold;
    }

    .ant-table-tbody > tr > td {
      padding: 5px; // 줄이고자 하는 패딩 값
      font-size: 12px; // 줄이고자 하는 글자 크기
      text-align: left;

  }
  
`;

