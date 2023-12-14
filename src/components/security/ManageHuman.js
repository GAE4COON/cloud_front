import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';





function ManageHuman(){
 
    let summary = ' AWS Database Migration Service는 각종 데이터베이스를 AWS로 빠르고 안전하게 데이터베이스를 마이그레이션할 수 있도록 지원하는 서비스로, 최소한의 가동 중단으로 진행 중인 변경 내용을 버복제할 수 있다는 장점을 가지고 있다. '
    let summary2 = ` DMS 마이그레이션은 마이그레이션할 데이터베이스 검색, 자동 스키마 변환, 복제 인스턴스, 원본 및 대상 엔트포인트, 복제 작업의 다섯 가지 구성 요소로 구성된다.`
    
    let summary3 = `1. DMS는 SQL 서버, MySQL 서버, 오라클 및 Postgre SQL 데이터베이스를 지원한다.
    `

    let summary4 = `2. DMS 스키마 변환을 사용하면, 데이터베이스 마이그레이션을 좀 더 유연하게 가능하도록 도움을 준다 
    
    `

    let summary5 = `3.AWS DMS 복제 인스턴스는 50GB 또는 100GB의 데이터 스토리지와 함께 제공된다 .    `
    let summary6 = `4.엔드 포인트 유형, 엔진 유형, 서버 이름, 포트, 암호화를 넣어 엔트포인트를 생성하여 대상 데이터 스토어에 접근한다.   `

    let summary7 = ` 본 인적 보안 섹션은 콜드체인 유통기업 내 직원 및 관련 이해당사자들의 정보 보안 의무와 책임을 중심으로 설계되♘다. 콜드체인 유통 기업의 직원 및 관련자들은 정보 보안에 대한 책임감을 가져야 하며, 그러한 책임감은 고용 전부터 시작되어 고용 후까지 지속된다. 이 가이드라인은 각 고용 단계별로 필요한 보안 고려사항 및 요구사항을 제시한다.
    \n
    직원 및 관계자 고용 전, 후보자의 적합성을 평가하는 초기 단계에서, 그들의 전력과 신뢰도를 검증하는 것이 중요하다. 이 검증은 후보자의 과거 경력, 교육 및 기타 관련 배경 정보를 통해 이루어지며, 관련 법률과 규정, 그리고 조직의 윤리 기준을 고려해야 한다. 특히 접근될 정보의 민감도와 잠재적 위험성에 따라 검증의 깊이와 범위를 조절해야 한다. 클라우드 기반의 환경에서 작업하는 기업의 경우, ISO 27017 및 ISO 27018 표준에 따라 후보자의 클라우드 서비스 경험 및 교육을 검토하는 것도 필요하게 된다.
    직원이 조직에 합류한 후에도 정보 보안은 중요한 이슈이다. 계약서에는 직원의 정보 보안에 대한 책임이 명확히 명시되어야 하며, 이를 위반할 경우 취할 조치도 정의되어야 한다. 또한 모든 직원은 조직의 정보 보안 정책과 절차, 그리고 실제 보안 위반 사례에 대한 교육을 받아야 한다. 보안 위반 시 취할 조치에 대한 징계 절차는 투명하게 공개되어야 하며, 모든 직원에게 알려져 있어야 한다. 기밀 정보 보호를 위해, 직원들은 정보 보안에 대한 기밀성 협약서에 서명해야 한다. 또한, 직원들이 원격으로 작업하는 경우 특별한 보안 지침이 제공되어야 한다. 모든 직원들은 보안 사건이 발생했을 때 신속히 보고하는 절차와 이를 위한 채널에 대해 알고 있어야 한다.
    직원의 퇴직, 관계자와의 계약 종료 후에도 그들에 대한 정보 보안 책임은 계속된다. 퇴직 시에는 보안 관련 절차와 직원의 계속되는 책임에 대해 명확하게 전달해야 한다.
    
    `

    let summary8 = ` 유통 회사는 정보와 자산을 보호하는 것이 매우 중요하다. 이 보호는 단순히 디지털 정보만을 대상으로 한 것이 아니다. 온도에 민감한 상품, 예를 들면 식품이나 의약품과 같은 제품들은 무단 접근, 훼손, 손실 또는 도난의 위험에 직면하고 있기에, 중요한 자산을 보호하기 위해 적절한 물리적 보안 조치가 필요하며, 이를 위해 ISO27001 표준에 따라 보안 가이드라인을 작성하였다.

    시설의 중요한 부분, 특히 냉동고나 창고와 같은 중요한 자원 주변에는 격리되고 보안 경계가 구축되어야 한다. 이 경계를 넘어서는 모든 접근은 통제되어야 하며, 이를 위해 RFID 카드 같은 인증 방식을 사용하여 인증된 사용자만이 해당 구역에 접근할 수 있도록 해야 한다. 또한, 보안을 위한 모니터링도 필수적이다. 실시간 모니터링 데이터를 효과적으로 수집하고 관리하기 위해 클라우드 통합 모니터링 솔루션을 도입하는 것이 바람직하다. 예를 들어, 보안 카메라를 설치하여 창고나 냉동고의 상황을 실시간으로 확인하고, 이 정보를 클라우드 서비스와 연동하여 필요한 경우 언제든지 원격으로도 접근할 수 있게 하는 것을 권고한다.
    
    환경적 위험 요소도 고려되어야 한다. 예를 들어 창고 내의 전력 공급 중단이 발생했을 때, 백업 발전기를 자동으로 가동시켜 냉동고나 다른 중요한 시설의 전력 공급을 지속적으로 유지하는 것이 중요하다. 또한, 물 새김이나 화재 같은 위험 상황을 대비하여 적절한 탐지 시스템과 대응 계획을 마련하는 것도 필요하다.
    
    화물트럭, 운송수단 및 저장고에 설치된 데이터 전송, 저장 및 처리 기기는 안전하게 관리되고 보호되어야 한다. 이러한 장비는 물리적으로 안전한 위치에 배치되며, 추가적인 물리적 보호 장치를 포함해야 한다.
    
    `

    let summary9 = ` 기술적 보안은 정보 자산의 무결성, 기밀성, 가용성을 보장하는 데 필수적이다. 시대가 발전함에 따라 새로운 위협이 지속적으로 등장하고 있기 때문에 이러한 위협을 예방하고 대응하기 위한 체계적인 접근 방식이 필요하다. 본 가이드라인은 국제 표준인 ISO 27002, 27017, 27018의 권장 사항을 바탕으로 구축되♘으며, 조직의 IT 환경에서의 다양한 위협에 대응하는 방법을 제시한다.

    기술적 보안은 모든 조직에 있어 핵심적인 요소로, 정보의 무결성, 기밀성, 및 가용성을 보장하는 역할을 한다. 사용자 장치의 보안 설정, 특힌 보안 패치 및 업데이트, 비밀번호 정책, 화면 잠금 등의 보안 관련 조치가 필수적이다. 그리고 관리자나 특권을 갖는 사용자의 접근 권한은 신중하게 관리되어야 하며, 해당 권한의 사용은 로깅되어야 한다.
    
    데이터 접근은 업무에 근거하여 제한되며, 이러한 제한은 안전한 인증, 다중 인증 방식을 통해 강화될 수 있다. 소스 코드 역시 중요한 자산이기 때문에, 저장소 보안 및 안전한 코딩 원칙을 준수하여 SQL 인젝션과 같은 공격으로부터 보호해야 한다. 외부 개발된 소프트웨어나 서비스는 내부 보안 표준에 따라 검토 및 수정된 후 사용되어야 한다.
    
    데이터 관리 측면에서는 민감한 정보는 마스킹 되어야 하며, 데이터 유출 방지 솔루션을 도입하여 외부로의 무단 전송을 차단해야 한다. 중요 정보는 암호화된 상태로 정기적으로 백업되며, 이 백업된 데이터의 복원 가능성은 정기적으로 테스트되어야 한다.
    
    시스템의 모든 활동은 로깅되어 보안 사건에 대한 조사와 분석이 가능하도록 해야 하며, 실시간 모니터링 도구를 통해 시스템 활동을 지속적으로 감시한다. 네트워크 보안에 있어서는 조직의 내부 네트워크를 방화벽, 침입 탐지 및 예방 시스템, VPN 등을 활용하여 외부 위협으로부터 보호하는 것이 중요하다. 또한, 민감한 정보를 다루는 네트워크 영역은 다른 네트워크로부터 분리하여 추가적인 보안을 제공한다.
    
    `
    // table 

  
  

const columns = [
  {
    title: '영역',
    dataIndex: 'title',
    key: 'title',
   
  },
  {
    title: '세부 이행 항목',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '이행지침',
    dataIndex: 'summary',
    key: 'summary',
  },
];

const dataSource = [
  {
    title: '데이터 이동 절차 (ISO 27001 - A.12.3, ISO 27002 - 13.2, ISO 27017 - 13.2)',
    content: '데이터 이동 계획 ',
    summary: 'AWS의 Compute Engine 인스턴스나 Persistent Disks 에서 데이터를 이동하기 전 어떤 데이터를 어디로, 언제, 어떻게 이동할지에 대한 계획을 세워야 한다.'  },
  {
    title: '데이터 이동 절차 (ISO 27001 - A.12.3, ISO 27002 - 13.2, ISO 27017 - 13.2)',
    content: '통제',
    summary: 'Cloud IAM (Identity and Access Management)을 사용하여 이동할 데이터에 대한 접근 권한을 설정한다. 예를 들어, 특정 프로젝트의 개발자는 데이터 이동을 위해 임시로 compute.instanceViewer 또는 compute.diskViewer 역할을 부여받을 수 있다.',
  },

  {
    title: '데이터 이동 절차 (ISO 27001 - A.12.3, ISO 27002 - 13.2, ISO 27017 - 13.2)',
    content: '이동 확인',
    summary: '데이터 이동이 완료된 후, Cloud Monitoring 과 Cloud Logging 을 사용하여 데이터 이동 로그를 확인하고, 원하는 대로 데이터가 이동되었는지 검증한다.',
  },
  {
    title: '데이터 이동 절차 (ISO 27001 - A.12.3, ISO 27002 - 13.2, ISO 27017 - 13.2)',
    content: '이동 확인',
    summary: '데이터 이동이 완료된 후, Cloud Monitoring 과 Cloud Logging 을 사용하여 데이터 이동 로그를 확인하고, 원하는 대로 데이터가 이동되었는지 검증한다.',
  },
  {
    title :' 임시 권한 부여 절차 (ISO 27001 - A.9.2, ISO 27002 - 9.2.6, ISO 27017 -9.1)',
    content: '임시 권한 요청',
    summary : '요청자는 필요한 권한과 사용 기간, 권한이 필요한 이유를 문서화하여 보안 팀에 제출한다'
    
  },
  
];


const column2 = [
    {
      title: '교육 주제',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
      title: '교육 개요',
      dataIndex: 'content',
      key: 'content',
    },
   
  ];

  const dataSource2 = [
    {
        title : 'AWS 기본 교육',
        content : '교육 대상: 모든 클라우드 사용자 내용: AWS 콘솔 사용법, 기본 서비스 소개, IAM 사용법, 기본적인 보안 원칙 등'
    },
    {
        title : '하이브리드 클라우드 보안 교육',
        content : '교육 대상: 클라우드 관련 업무를 수행하는 팀 내용: 하이브리드 클라우드의 구조, 데이터 이동 시 주의점, AWS 에서의 보안 사례 및 활용 방법 등 자료: 사례 기반의 문서, 시뮬레이션, 팀별 워크샵'
    },
    {
        title : '보안 인식 교육',
        content : '교육 대상: 전 직원 내용: 최근의 보안 사건, AWS 환경에서의 주요 위협, 보안 인식 향상을 위한 실용적인 팁 등 자료: 보안 뉴스, 보안 사건 분석 리포트, 퀴즈 및 시뮬레이션 게임 샵'
    },

      
    
  ];

  const columns3 = [
    {
      title: '정책 조항',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
      title: '정책 소개',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '이행지침',
      dataIndex: 'summary',
      key: 'summary',
      render: text => <div dangerouslySetInnerHTML={{ __html: text }} />, // HTML을 렌더링
    },
    
  ];

  const dataSource3 = [

    {
        title: '정보 분류 및 라벨링 (ISO 27002 - 8.2)',
        content: '모든 정보는 생성 시 공개/내부용/민감/기밀 중 하나로 분류해야 한다.',
        summary:
          '공개: 회사 브로셔, 홍보 자료. 내부용: 내부 연차 보고서, </br> 기사 경로 정보. 민감: 수탁사 정보, 배송물품 정보, 현재 콜드체인 상태정보. \n\n기밀: 내부 직원 정보, 기사정보, 계약서.',
      },
    {
        title: '사용자 인증 정보 관리 (ISO 27002 - 9.2, ISO 27017 - 9.2)',
        content: '사용자의 인증 정보는 정기적으로 변경되어야 하며, 복잡한 패턴을 준수해야 한다.',
        summary: 'GCP 의 IAM 과 Cloud IAP 를 사용하여 사용자 접근 제어와 인증을 강화한다.',
      },
    
      {
        title: '개인 정보 보호 (ISO 27018 - 5.1)',
        content: '모든 개인 정보, 특히 기사 및 내부 직원의 정보는 ISO 27018 및 관련 규정을 준수하여 처리해야 한다.',
        summary: '고객, 수탁사, 기사 및 내부 직원의 정보에 대한 접근 권한을 제한한다. 데이터를 GCP 에 저장하기 전에 개인식별정보(PII)를 암호화하거나 익명화하여 보호한다.',
      },
      {
        title: '데이터 이동 절차 (ISO 27001 - A.12.3, ISO 27002 - 13.2, ISO 27017 - 13.2)',
        content: '이동 확인',
        summary: '데이터 이동이 완료된 후, Cloud Monitoring 과 Cloud Logging 을 사용하여 데이터 이동 로그를 확인하고, 원하는 대로 데이터가 이동되었는지 검증한다.',
      },
      {
        title :' 콜드체인 상태정보 및 물류 데이터 관리 (ISO 27017 - 12.1)',
        content: '콜드체인의 상태정보 및 물류 데이터는 적절한 보안 수준을 유지하여 처리해야 한다.',
        summary : 'GCP 의 스토리지 및 네트워크 솔루션을 사용하여 데이터의 무결성과 가용성을 보장한다. 데이터의 변경, 이동, 삭제에 대한 로그를  지속적으로 모니터링하고 저장한다'
        
      },
      
    
  ];


  const columns4 = [
    {
      title: '고려 항목',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
      title: '세부 항목',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '이행지침',
      dataIndex: 'summary',
      key: 'summary',
      //render: text => <div dangerouslySetInnerHTML={{ __html: text }} />, // HTML을 렌더링
    },
    
  ];


  const dataSource4 = [
    {
      title: '계약 체결 (ISO27002 6.2.1, ISO27001 A.15.1.1)',
      content: '보안 요구사항 포함',
      summary:
        '모든 공급업체와의 계약서에는 정보 보안 요구사항이 포함되어야 한다. 이는 데이터 처리, 보관, 이동, 접근 권한 관리 및 기타 보안 관련 항목을 포함한다.',
    },
    {
      title: '계약 체결 (ISO27002 6.2.1, ISO27001 A.15.1.1)',
      content: 'ICT 서비스의 보안 위험 평가',
      summary: '공급업체가 제공하는 ICT 서비스에 대한 보안 위험을 평가하고, 필요한 경우 추가적인 보안 요구사항을 계약에 포함시켜야 한다.',
    },
    {
      title: '데이터 관리 (ISO27002 8.2.3, ISO27002 8.3.2)',
      content: '데이터 이동 및 저장',
      summary: 'AWS IaaS 를 사용하여 데이터를 이동 및 보관할 때,암호화, IAM 정책, VPC 피어링 등 GCP 의 보안기능을 적극 활용하며, 보안 규정에 따라 관리해야한다.',
    },
    {
      title: '데이터 관리 (ISO27002 8.2.3, ISO27002 8.3.2)',
      content: '데이터 종료 절차',
      summary: '계약 종료 시 공급업체로부터 반환해야 하는 데이터 및 계약 종료 시 파괴해야 하는 데이터에 대한 정책을 수립하고 시행해야 합니다.',
    },
    {
      title: '서비스 모니터링 및 변경 관리 (ISO27002 12.4.1, ISO27002 6.1.3)',
      content: 'SLA 관리',
      summary: '서비스 수준 합의에 따라 공급업체 서비스의 성능 및 보안 상태를 지속적으로 모니터링해야 한다. SLA위반 시 책임 및 대응 조치에 대해 명시해야 한다.',
    },
    {
      title: '서비스 모니터링 및 변경 관리 (ISO27002 12.4.1, ISO27002 6.1.3)',
      content: '보안 이슈 대응',
      summary: 'AWS IaaS 환경에서 발생하는 보안 이슈에 대한 대응 프로세스를 마련하고, 공급업체와 협력하여 적시에해결하는 방안을 강구해야 한다.',
    },
    {
      title: '하이브리드 클라우드 환경에서의 보안 강화 (ISO/IEC 27017 6.3.1, ISO/IEC 27018 5.5.1, ISO/IEC 27018 5.3.1)',
      content: '데이터 위치 및 책임 분배. 개인 식별 정보 보호',
      summary: 'ISO/IEC 27017 및 27018 에 따라 클라우드 환경에서의 데이터 위치와 책임 분배를 명확히 해야한다.',
    },
    {
        title: '하이브리드 클라우드 환경에서의 보안 강화 (ISO/IEC 27017 6.3.1, ISO/IEC 27018 5.5.1, ISO/IEC 27018 5.3.1)',
        content: '개인 식별 정보 보호',
        summary: 'ISO/IEC 27018 에 따라 클라우드 환경에서 처리되는 개인식별정보의 보호를 강화해야 한다',
    },
    {
      title: '계속적인 교육 및 인증 (ISO27002 7.2.2, ISO27001 A.18.1.3)',
      content: '보안 교육',
      summary: '공급업체 및 내부 직원 대상으로 AWS IaaS 와 하이브리드 클라우드의 보안 교육을 지속적으로 실시해야 한다.',
    },
    {
      title: '계속적인 교육 및 인증 (ISO27002 7.2.2, ISO27001 A.18.1.3)',
      content: '보안 인증',
      summary: '공급업체 및 기업의 서비스가 ISO/IEC 27K 시리즈와 같은 국제 표준에 부합하는지 지속적으로 검증하고 인증을 갱신해야 한다.',
    },
  ];
  
  const dataSource5 = [
    {
      title: '서비스 가용성 및 성능 (ISO27002 12.1.3)',
      content: '가용성',
      summary:
        'AWS IaaS 서비스는 연간 99.9%의 가용성을 목표로 합니다. 예를 들어, 한 달 동안 서비스는 최대 43분까지 중단될 수 있습니다.',
    },
    {
      title: '서비스 가용성 및 성능 (ISO27002 12.1.3)',
      content: '응답 시간',
      summary:
        '웹페이지나 애플리케이션 로딩 시간은 3초 이내여야 하며, 기업의 테스트 환경에서는 평균 1.5초 내외로 응답되어야 합니다.',
    },
    {
      title: '보안 및 개인정보 보호 (ISO27002 10.1.1, ISO27017 9.5.1, ISO27018 9.4, ISO27002 9.1.2, ISO27017 9.1.3, ISO27018 9.2)',
      content: '데이터 보호',
      summary:
        'AWS IaaS에서 처리되는 모든 데이터는 전송 및 저장 시 암호화됩니다. 예를 들어, 회사 데이터는 AES-256 암호화 알고리즘을 사용하여 보호됩니다.',
    },
    {
      title: '보안 및 개인정보 보호 (ISO27002 10.1.1, ISO27017 9.5.1, ISO27018 9.4, ISO27002 9.1.2, ISO27017 9.1.3, ISO27018 9.2)',
      content: '접근 제어',
      summary:
        '기업의 개발팀은 읽기 전용(read-only) 권한만을 부여받으며, 데이터 변경이나 삭제는 불가능합니다.',
    },
    {
      title: '보안 및 개인정보 보호 (ISO27002 10.1.1, ISO27017 9.5.1, ISO27018 9.4, ISO27002 9.1.2, ISO27017 9.1.3, ISO27018 9.2)',
      content: '개인정보 보호',
      summary:
        'AWS IaaS에서 처리되는 고객의 주소나 전화번호와 같은 개인 정보는 별도의 보안 레이어로 보호됩니다.',
    },
    {
      title: '보안 인사이던트 및 대응 (ISO27002 16.1.2, ISO27002 16.1.6)',
      content: '인사이던트 알림',
      summary:
        '보안 사건 발생 시, 기업의 보안 담당자는 2시간 이내에 통보받아야 합니다. 예를 들어, 데이터 유출 사건이 발생하면, 이를 2시간 이내에 이메일과 전화로 알림받아야 합니다.',
    },
    {
      title: '보안 인사이던트 및 대응 (ISO27002 16.1.2, ISO27002 16.1.6)',
      content: '인사이던트 대응 및 복구',
      summary:
        '사건 발생 후 4시간 이내에 대응 조치를 시작해야 합니다. 예를 들어, 데이터 유출을 차단하고 유출된 데이터의 범위를 조사하는 등의 조치를 취해야 합니다.',
    },
    {
      title: '서비스 검토 및 개선 (ISO27002 12.7, ISO27002 12.1.2)',
      content: '성능 및 보안 검토',
      summary:
        '매 분기별로 AWS IaaS의 성능과 보안 상태를 검토해야 합니다. 이 검토에는 지난 3개월 동안의 서비스 다운타임, 응답 시간, 보안 사건 등이 포함됩니다.',
    },
    {
      title: '서비스 검토 및 개선 (ISO27002 12.7, ISO27002 12.1.2)',
      content: '서비스 업데이트 및 변경 관리',
      summary:
        '기업에게 서비스 변경이 예정된 경우, 최소 1주일 전에 알림이 전달됩니다. SLA 항목을 지키지 못할 경우, 서비스 비용의 10%가 다음 달 청구서에서 할인됩니다. 예를 들어, 가용성이 한 달 동안 99%로 떨어진 경우, 기업은 다음 달 청구서에서 10% 할인을 받게 됩니다.',
    },
  ];
  
  const columns6 = [
    {
      title: '정책 항목',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
        title: '이행 지침',
        dataIndex: 'content',
        key: 'content',
      },
  ];

  const dataSource6 = [
    {
      title: '사건 대응 시나리오 준비 (ISO27002 16.1.5)',
      content: '기업은 정보 보안 사건, 데이터 유출, 물리적인 보안 사건(예: 냉장고 도난) 등 다양한 시나리오를 준비하고 검토한다. 이를 통해 정기적으로 직원 교육과 모의 훈련을 실시한다.',
    },
    {
      title: '사건 대응 전용 팀 구성 (ISO27002 6.1.3)',
      content: '기업의 "보안 대응 전담팀"은 IT 보안 전문가, 물리적 보안 전문가, 그리고 유통 경영 전문가로 구성된다. 이 팀은 정보 보안과 물리적 보안의 최신 동향 및 대응 방안에 대한 연속적인 교육을 받는다.',
    },
    {
      title: '사건 평가 및 심각성 파악 (ISO27001 A.12.4, ISO27002 13.1.2)',
      content: '실시간 모니터링 시스템을 통해 네트워크 침입, 데이터 유출, 물리적 보안 위반 등의 사건을 감지하고 평가한다. 이 시스템은 위협의 종류와 수준을 바탕으로 사건의 심각성을 자동으로 파악한다.',
    },
    {
      title: '즉각적인 대응 및 협력 (ISO27001 A.16.1, ISO27002 16.1.1)',
      content: '보안 사건 발생 시, 기업은 내부 대응팀과 함께 외부 보안 전문가나 정보 보안 관련 기관과의 협력을 통해 신속하게 대응한다. 또한, CWL과 협력 업체 간의 보안 정보 공유 및 협력 프로토콜을 구축하여 보다 효과적인 대응이 가능하도록 한다.',
    },
    {
      title: '사건 후 분석 및 재발 방지 전략 (ISO27002 16.1.7, ISO27017 11.2)',
      content: '보안 전담팀은 사건 발생 후 원인 분석과 함께 대응 과정에서의 문제점을 상세히 분석한다. 이를 바탕으로 기술적, 인적, 제도적 측면에서의 재발 방지 전략을 수립하고 이를 실행한다.',
    },
  ];
  
  const columns7 = [
    {
      title: '고려 항목',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
        title: '항목 설명',
        dataIndex: 'content',
        key: 'content',
      },
  ];

  const dataSource7 = [
    {
      title: '데이터 분류 및 접근 권한 (ISO27001 A.8.2, ISO27002 8.2.2, ISO27017 9.5, ISO27018 9.4)',
      content: '보안 정보를 공유할 때, 해당 정보의 민감도 및 중요도를 분류하고, 접근 권한을 적절히 설정해야 한다. 모든 정보가 모든 협력 업체와 공유될 필요는 없으므로, 업체별로 어떤 정보에 접근할 수 있는지를 미리 정의해야 한다.',
    },
    {
      title: '암호화 및 안전한 전송 (ISO27001 A.10.1, ISO27002 10.1.1, ISO27017 10.1, ISO27018 10.1)',
      content: '중요한 보안 정보를 전송할 때는 데이터를 암호화하고 안전한 채널을 통해 전송해야 한다. 이로 인해 데이터가 중간에 노출되거나 탈취당하는 위험을 최소화할 수 있다.',
    },
    {
      title: '응답 시간 및 대응 방안 동기화 (ISO27001 A.16.1, ISO27002 16.1.4, ISO27017 11.3)',
      content: '보안 사건 발생 시 빠른 대응이 중요하므로, 기업과 협력 업체 사이의 응답 시간을 명확히 하고, 대응 방안을 동기화하는 것이 필요하다.',
    },
    {
      title: '계약 및 법률적 측면 검토 (ISO27001 A.18.1, ISO27002 18.1.3, ISO27017 15.1, ISO27018 14.2)',
      content: '보안 정보 공유 및 협력 프로토콜은 법률적인 측면도 고려해야 한다. 정보 보호 및 개인정보 처리 관련 법률, 규정을 준수하면서 프로토콜을 구축하는 것이 중요하다.',
    },
    {
      title: '프로토콜 검토 및 업데이트 (ISO27001 A.16.1, ISO27002 16.1.6)',
      content: '보안 환경은 지속적으로 변화하므로, 구축된 프로토콜도 정기적으로 검토하고 필요한 경우 업데이트 해야 한다. 이를 위해 기업과 협력 업체는 연간 또는 반기별로 보안 회의를 개최하여 현재의 프로토콜 상태와 개선 사항을 논의해야 한다.',
    },
  ];
  

  const columns8 = [
    {
      title: '추가 보안 항목',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
        title: '항목 설명',
        dataIndex: 'content',
        key: 'content',
      },
  ];
  const dataSource8 = [
    {
      title: '데이터 암호화 (ISO/IEC 27017 12.1.1)',
      content: 'CWL은 콜드체인 유통 과정에서 수집되는 민감한 정보(온도 데이터, 운송 경로, 고객 주문 정보 등)를 안전하게 보관하기 위해 클라우드에 저장될 때 end-to-end 암호화를 실시한다. 이를 위해 GCP의 KMS 서비스를 활용하며, 외부와의 데이터 교류 시 HTTPS를 기반으로 한 암호화 전송을 지향한다.',
    },
    {
      title: '다중인증 (ISO/IEC 27017 9.2.3)',
      content: 'CWL 직원 및 협력 업체는 물류 관리 시스템에 접근할 때 일반적인 로그인 정보 외에도 휴대전화 문자 메시지를 통한 OTP를 입력하여야 한다. 이를 통해 무단 접근을 효과적으로 방지한다.',
    },
    {
      title: '접근 제한 (ISO/IEC 27017 9.1.2)',
      content: 'CWL의 물류 및 주문 관리 팀만이 고객 주문 데이터와 관련된 클라우드 자원에 접근 권한을 가진다. 반면, 온도 및 품질 관리 팀은 콜드체인 데이터에만 접근할 수 있도록 설정되어 있다. GCP의 IAM 기능을 활용해 이러한 권한 설정을 세분화하고 관리한다.',
    },
    {
      title: '로그 및 감사 (ISO/IEC 27017 12.4.3)',
      content: '모든 콜드체인 운송 과정에서의 데이터 변경, 업데이트, 조회 로그는 GCP의 로그 관리 시스템을 통해 저장된다. 이 로그는 품질 보증 및 재발 방지를 위한 내부 감사 시에 활용된다.',
    },
    {
      title: '개인식별정보 보호 (ISO/IEC 27018 9.2.3)',
      content: 'CWL은 고객의 주문 및 배송 주소와 같은 개인정보를 별도의 보안 클라우드 스토리지에 저장한다. 해당 정보는 오직 주문 처리 및 배송 목적으로만 활용되며, 개인정보 접근 권한은 엄격하게 제한된다. 이 방식은 ISO/IEC 27018의 권고사항에 따라 관리된다.',
    },
  ];
  
  const columns9 = [
    {
      title: '고용 단계',
      dataIndex: 'title',
      key: 'title',
     
    },
    {
        title: '고려사항',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: '세부 이행 사항',
        dataIndex: 'summary',
        key: 'summary',
      },
  ];
  
  const dataSource9 = [
    {
      title: '고용 전 (ISO/IEC 27002: 7.2.2, ISO/IEC 27002: 7.1.1, ISO/IEC 27017: 6.3.1)',
      content: '스크리닝',
      summary: '후보자의 배경을 철저하게 검증한다. 특히, 이전 직장에서의 콜드체인 관리나 물류 관련 경험 및 이력을 확인한다.',
    },
    {
      title: '고용 전 (ISO/IEC 27002: 7.2.2, ISO/IEC 27002: 7.1.1, ISO/IEC 27017: 6.3.1)',
      content: '고용조건',
      summary: '직원의 정보 보안 책임을 계약에 명시한다. 예를 들어, IaaS 클라우드 환경에서의 데이터 보안을 강조해야 한다.',
    },
    {
      title: '고용 중 (ISO/IEC 27002: 7.2.2, ISO/IEC 27002: 7.3.1, ISO/IEC 27002: 13.2.4, ISO/IEC 27002: 6.2.2, ISO/IEC 27002: 16.1.1, ISO/IEC 27002: 16.1.2, ISO/IEC 27017: 11.1.4)',
      content: '정보 보안 교육',
      summary: '콜드체인 데이터의 중요성, 클라우드 환경에서의 보안 프로토콜 등에 대한 교육을 주기적으로 진행한다.',
    },
    {
      title: '고용 중 (ISO/IEC 27002: 7.2.2, ISO/IEC 27002: 7.3.1, ISO/IEC 27002: 13.2.4, ISO/IEC 27002: 6.2.2, ISO/IEC 27002: 16.1.1, ISO/IEC 27002: 16.1.2, ISO/IEC 27017: 11.1.4)',
      content: '징계 절차',
      summary: '데이터 누출이나 보안 위반 시 징계 절차를 명시하며, 특히 클라우드 환경에서의 위반에 대한 세부 절차를 강화한다.',
    },
    {
      title: '고용 중 (ISO/IEC 27002: 7.2.2, ISO/IEC 27002: 7.3.1, ISO/IEC 27002: 13.2.4, ISO/IEC 27002: 6.2.2, ISO/IEC 27002: 16.1.1, ISO/IEC 27002: 16.1.2, ISO/IEC 27017: 11.1.4)',
      content: '기밀성 협약',
      summary: '직원들과 기밀성 협약을 체결하며, 협약 내용에는 클라우드 환경의 데이터 보안에 대한 내용을 포함해야 한다.',
    },
    {
      title: '고용 중 (ISO/IEC 27002: 7.2.2, ISO/IEC 27002: 7.3.1, ISO/IEC 27002: 13.2.4, ISO/IEC 27002: 6.2.2, ISO/IEC 27002: 16.1.1, ISO/IEC 27002: 16.1.2, ISO/IEC 27017: 11.1.4)',
      content: '원격 근무',
      summary: '클라우드 접속 시 VPN 사용하며, 멀티 팩터 인증 활성화 등의 보안'
    }
    ]

    const columns10 = [
        {
          title: '영역',
          dataIndex: 'title',
          key: 'title',
         
        },
        {
            title: '세부 항목',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '이행 지침',
            dataIndex: 'summary',
            key: 'summary',
          },
      ];
      
      const dataSource10 = [
        {
          title: '출입통제 (ISO27001 A.11.1.5, ISO27001 A.11.1.2)',
          content: '물리적 보안 경계',
          summary: '중요 시설 주변에는 격리 및 보안 경계가 필요하다. 창고 입구에는 보안 표지판과 바리케이드를 설치하여 무단 접근을 방지한다.',
        },
        {
          title: '출입통제 (ISO27001 A.11.1.5, ISO27001 A.11.1.2)',
          content: '물리적 출입',
          summary: '허가받은 사용자만이 보안 경계 내부로 접근해야 한다. 기사와 직원에게 RFID 카드를 제공하여 인증된 사용자만 창고에 접근할 수 있도록 한다.',
        },
        {
          title: '물리적 분리 및 모니터링 (ISO27001 A.11.2.1, ISO27001 A.11.1.4)',
          content: '물리적 보안 모니터링',
          summary: '클라우드 통합 모니터링 솔루션을 도입하여 중앙에서 모니터링 데이터를 관리한다. 보안 카메라의 실시간 영상을 클라우드 서비스에 연동하여 원격으로도 확인할 수 있게 한다.',
        },
        {
          title: '물리적 분리 및 모니터링 (ISO27001 A.11.2.1, ISO27001 A.11.1.4)',
          content: '물리적 및 환경적 위협에 대한 보호',
          summary: '빠른 대응이 가능하도록 백업 발전기와 물 새김 탐지 시스템 등을 준비한다. 창고의 전력 공급이 중단될 경우, 백업 발전기가 자동으로 작동하여 냉동고의 전력을 지속적으로 공급하도록 설정한다.',
        },
        {
          title: '장비 및 이동 수단 내 데이터 기기 보안 (ISO27001 A.11.1.3, ISO27001 A.11.2.6)',
          content: '화물트럭 및 운송수단',
          summary: '각 트럭 및 운송수단에는 충격에 강한 보안 카메라 및 GPS 추적 시스템이 설치되어야 한다. 차량 내부에 설치된 데이터 전송 및 저장 장치는 강화된 보호 케이스 내에 위치하여 물리적 손상에서 보호받아야 한다. 장치는 쉽게 접근하거나 제거할 수 없도록 고정 장치와 함께 설치된다. 외부의 물리적 충격이나 침입 시 경보 시스템이 작동하도록 설정한다.',
        },
        {
          title: '장비 및 이동 수단 내 데이터 기기 보안 (ISO27001 A.11.1.3, ISO27001 A.11.2.6)',
          content: '기타 기기',
          summary: '무선 데이터 전송 장치나 기타 휴대 가능한 기기는 강화 플라스틱 또는 금속 케이스로 보호받아야 한다. 장치의 고정 및 잠금 장치는 무단 접근 및 제거를 방지하기 위해 필요하다. 장치가 움직이거나 이동될 경우, 센서가 반응하여 경보가 울리도록 설정될 수 있다.',
        },
      ];
      const columns11 = [
        {
          title: '영역',
          dataIndex: 'title',
          key: 'title',
         
        },
        {
            title: '세부 항목',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '이행 지침',
            dataIndex: 'summary',
            key: 'summary',
          },
      ];
    
      
     
      const dataSource11 = [
        {
          "title": "인증관리 (ISO27002 6.2.1, ISO27001 A.9.2.2, ISO27001 A.9.1.2, ISO27002 9.4.2)",
          "content": "사용자 엔드포인트",
          "summary": "직원의 모든 디바이스에 MDM (Mobile Device Management) 솔루션을 도입하여 원격으로 보안 정책을 강제하고 장치를 관리한다."
        },
        {
          "title": "인증관리 (ISO27002 6.2.1, ISO27001 A.9.2.2, ISO27001 A.9.1.2, ISO27002 9.4.2)",
          "content": "특권 접근 권한",
          "summary": "관리자 권한은 최소한의 직원만이 받을 수 있으며, 권한 부여에 앞서 내부 승인 프로세스를 통과해야 한다."
        },
        {
          "title": "인증관리 (ISO27002 6.2.1, ISO27001 A.9.2.2, ISO27001 A.9.1.2, ISO27002 9.4.2)",
          "content": "정보 접근 제한",
          "summary": "역할 기반 접근 제어 (RBAC)를 구현하여 각 직원의 역할에 따라 데이터 접근 권한을 설정한다."
        },
        {
          "title": "소프트웨어 및 소스코드 관리 (ISO27001 A.9.4.5, ISO27017 9.4.1, ISO27001 A.14.2.8, ISO27002 14.2.7)",
          "content": "소스 코드에 대한 접근",
          "summary": "GitLab 또는 GitHub 와 같은 소스 코드 관리 시스템을 사용하며, 각 접근은 계정 기반으로 로깅되어 추적된다."
        },
        {
          "title": "소프트웨어 및 소스코드 관리 (ISO27001 A.9.4.5, ISO27017 9.4.1, ISO27001 A.14.2.8, ISO27002 14.2.7)",
          "content": "안전한 코딩",
          "summary": "개발자에게 OWASP Top 10 및 다른 보안 취약성에 대한 교육을 제공한다."
        },
        {
          "title": "소프트웨어 및 소스코드 관리 (ISO27001 A.9.4.5, ISO27017 9.4.1, ISO27001 A.14.2.8, ISO27002 14.2.7)",
          "content": "보안 테스트",
          "summary": "모든 코드 변경 사항은 자동화된 보안 테스트를 거친 후 배포된다."
        },
        {
          "title": "소프트웨어 및 소스코드 관리 (ISO27001 A.9.4.5, ISO27017 9.4.1, ISO27001 A.14.2.8, ISO27002 14.2.7)",
          "content": "외부 개발",
          "summary": "외부에서 개발된 코드는 기업 내 보안 팀에 의해 검토 및 테스트가 이루어지기 전까지 실제 환경에 배포되지 않는다."
        },
        {
          "title": "데이터 관리 (ISO27018 PII.3.1, ISO27001 A.13.2.3, ISO27002 12.3.1)",
          "content": "데이터 마스킹",
          "summary": "사용자 개인 정보가 시스템에 저장되거나 전송될 때, 실제 값을 숨기기 위해 토큰화 및 데이터 마스킹 도구를 사용한다"
        },
        {
          "title": "데이터 관리 (ISO27018 PII.3.1, ISO27001 A.13.2.3, ISO27002 12.3.1)",
          "content": "데이터 유출 방지",
          "summary": "DLP 솔루션을 도입하여 중요 데이터의 외부로의 유출을 감지하고 차단한다."
        },
        {
          "title": "데이터 관리 (ISO27018 PII.3.1, ISO27001 A.13.2.3, ISO27002 12.3.1)",
          "content": "정보 백업",
          "summary": "모든 중요 데이터는 암호화된 형태로 AWS S3, Google Cloud Storage 또는 유사한 서비스에 주기적으로 백업된다."
        },
        {
          "title": "모니터링 (ISO27001 A.12.4.1, ISO27001 A.12.4.3)",
          "content": "로깅",
          "summary": "모든 로그는 ELK Stack (Elasticsearch, Logstash, Kibana) 또는 유사한 솔루션을 사용하여 중앙화되어 저장 및 분석된다"
        },
        {
          "title": "모니터링 (ISO27001 A.12.4.1, ISO27001 A.12.4.3)",
          "content": "모니터링 활동",
          "summary": "기업은 SIEM (Security Information and Event Management) 솔루션을 도입하여 비정상적 활동을 실시간으로 감지한다."
        }, {
            "title": "네트워크 관리 (ISO27002 13.1.2, ISO27001 A.13.1.3, ISO27001 A.13.2.3)",
            "content": "네트워크 보안",
            "summary": "모든 네트워크 트래픽은 WAF (Web Application Firewall)와 IDS/IPS 시스템을 통해 필터링된다."
          },
          {
            "title": "네트워크 관리 (ISO27002 13.1.2, ISO27001 A.13.1.3, ISO27001 A.13.2.3)",
            "content": "네트워크 분리",
            "summary": "민감한 데이터를 처리하는 서버는 별도의 VLAN에 위치시켜 다른 네트워크와 격리된다."
          },
          {
            "title": "네트워크 관리 (ISO27002 13.1.2, ISO27001 A.13.1.3, ISO27001 A.13.2.3)",
            "content": "암호화 사용",
            "summary": "모든 네트워크 통신은 TLS를 사용하여 암호화된다."
          },
          {
            "title": "실시간 위치 및 상태 모니터링 (ISO27002 12.4.1, ISO27002 13.1.2, ISO27002 12.4.3)",
            "content": "장비 및 차량 위치 모니터링 위치기반 경보 시스템",
            "summary": "GPS 기반의 위치 추적 시스템을 사용하여 모든 차량과 장비의 실시간 위치 정보를 중앙 데이터베이스에 기록한다. 모든 로그는 암호화되어 저장되며, 접근은 제한적으로 관리된다."
          },
          {
            "title": "실시간 위치 및 상태 모니터링 (ISO27002 12.4.1, ISO27002 13.1.2, ISO27002 12.4.3)",
            "content": "운송상태 모니터링",
            "summary": "각 차량에 설치된 센서들은 실시간으로 온도와 습도 정보를 수집하고 중앙 데이터베이스에 전송한다. 온도와 습도는 설정된 임계치와 비교되어 경보가 필요한 경우 중앙 시스템에서 자동으로 알림을 전송한다."
          },
          {
            "title": "모바일 앱 및 웹 인터페이스 (ISO27017 9.5.1, ISO27002 14.3.1, ISO27002 12.3.1)",
            "content": "실시간 대시보드",
            "summary": "관리자나 담당자는 웹 인터페이스나 모바일 앱을 통해 모든 차량 및 장비의 실시간 위치와 상태를 확인할 수 있다. 액세스는 개인별로 제한되며, 각 사용자는 그에 맞는 권한을 부여받아야 한다."
          },
          {
            "title": "모바일 앱 및 웹 인터페이스 (ISO27017 9.5.1, ISO27002 14.3.1, ISO27002 12.3.1)",
            "content": "리포팅 및 분석 도구",
            "summary": "과거 데이터를 기반으로 다양한 분석을 수행할 수 있는 도구를 제공한다. 중앙 데이터베이스에서는 주기적으로 백업을 수행하며, 백업 데이터는 암호화되어 저장된다."
          }
        // ... 추가 데이터 항목들도 위와 같이 수정되어야 합니다.
      ]
    
    return (
        <div>
             
              <div id="divToPrint">
              <ResourceContainer>
                  <Overview> 마이그레이션 가이드라인 </Overview>
                  <Title>1. AWS Database Migration Service (DMS) </Title>
                  <Summary> { summary}</Summary>

                  <SemmiTitle>A. DMS 특징  </SemmiTitle>
                  <SemmiSummary>{ summary2 }</SemmiSummary> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary3 }</SemmiSummary2> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary4 }</SemmiSummary2> {/* 여기를 수정했습니다 */}
                  <SemmiSummary2>{ summary5 }</SemmiSummary2> {/* 여기를 수정했습니다 */}


                  
                  <SemmiTitle>B.  MySQL DB Migration 방법  </SemmiTitle>
                  <SemmiTitle2>1. RDS를 생성한다.  </SemmiTitle2>
                  <SemmiSummary>Migration이 되어질 DB를 생성을 한다. 데이터베이스의 방식을 선택을 하며 DB 인스턴스 이름을 설정을 해주고, DB 기본 User의 ID / PW를 지정해준다 .
그 후 VPC 그룹과 보안 그룹을 지정해준다.  RDS를 생성을 했다면, EC2 인스턴스에서 RDS에 접속을 하여 초기 DB 상태를 확인한다. 
</SemmiSummary> {/* 여기를 수정했습니다 */}

                  <SemmiTitle2>2.서브넷 그룹을 생성한다.   </SemmiTitle2>
                                    <SemmiSummary>DMS 콘솔에 들어가서 서브넷 그룹에 들어가 서브넷 그룹을 생성을 한다. 존재하는 퍼블릭 서브넷을 선택을 하고 서브넷 그룹을 선택을 한다. 이때 서브넷을 꼭 Internet Gateway를 통해 외부와 접속을 해야 한다. </SemmiSummary> {/* 여기를 수정했습니다 */}

                  <SemmiTitle2>3. 복제 인스턴스 생성  </SemmiTitle2>
                  <SemmiSummary>
                    복제 인스턴스는 과금이 되며 DMS 콘솔로 들어가 복제 인스턴스를 생성해야 한다.  또한 이름, 클래스, VPC 등을 선택을 해주며 
                    서브넷 그룹, 보안 그룹 등을 지정한 후 생성을 해준다. 
                    그렇게 되면 복제 인스턴스 생성이 완료가 된다. 
                     </SemmiSummary> {/* 여기를 수정했습니다 */}

                     <SemmiTitle2>4. Source Endpoint 생성  </SemmiTitle2>
                  <SemmiSummary>
                    DMS 콘솔로 들어가 엔드포인트에서 생성을 해줍니다.  소스 엔드포인트를 선택을 하고 식별자 및 리소스 이름  및 소스 엔진을 선택을 하고 
                    서버 이름 및 포트 및 사용자 이름 및 암호를 생성해줍니다. 
                    해당 인스턴스는 다음과 같이 설정을 하면 좋습니다. 
                    엔드포인트 식별자 = 엔드포인트 이름을 의미합니다. 
데이터베이스 엑세스를 수동으로 액세스하며, 
서버 이름에는 DB가 존재하는 Public IP를 입력합니다. 
포트는 MariaDB의 포트 3306 입력하고 
사용자 이름, 암호는 모든 IP가 접근할 수 있는 사용자로 입력합니다. (root계정은 defualt로 localhost만 접근가능)
을 의미합니다. 

                     </SemmiSummary> {/* 여기를 수정했습니다 */}


               
                  <SemmiTitle>사용 사례 </SemmiTitle>
                  <SemmiTitle>온프레미스 애플리케이션 </SemmiTitle>
                  <SemmiSummary>물리적 서버, VMware vSphere, Microsoft Hyper-V 및 기타 온프레미스 인프라에서 실행되는 SAP, Oracle 및 SQL Server와 같은 애플리케이션을 마이그레이션합니다.</SemmiSummary> {/* 여기를 수정했습니다 */}


                  <SemmiTitle>클라우드 기반 애플리케이션</SemmiTitle>
                  <SemmiSummary>
                  다른 퍼블릭 클라우드에서 실행되는 애플리케이션을 AWS로 마이그레이션합니다. 비용을 낮추고, 가용성을 높이며, 혁신을 촉진하는 200개 이상의 서비스에 액세스할 수 있습니다.
                    </SemmiSummary> {/* 여기를 수정했습니다 */}

                    <SemmiTitle>AWS 리전 사이</SemmiTitle>
                  <SemmiSummary>
                  AWS 리전, 가용 영역 또는 계정에서 Amazon Elastic Compute Cloud(EC2) 워크로드를 보다 쉽게 마이그레이션하여 비즈니스, 복원성 및 규정 준수 요구 사항을 충족합니다.
                                      </SemmiSummary> {/* 여기를 수정했습니다 */}
                  <SemmiTitle>애플리케이션 현대화</SemmiTitle>
                  <SemmiSummary>
                  사용자 지정 현대화 작업을 적용하거나 지역 간 재해 복구, Windows Server 버전 업그레이드, Windows MS-SQL BYOL에서 AWS로의 라이선스 전환과 같은 기본 제공 작업을 선택하여 애플리케이션을 최적화합니다.                    </SemmiSummary> {/* 여기를 수정했습니다 */}

               
                
                 
                  <TableContainer> 
                      <StyledTable dataSource={dataSource} columns={columns} pagination={false} />
                  </TableContainer>

                  <TableContainer> 
                      <StyledTable dataSource={dataSource2} columns={column2} pagination={false} />
                  </TableContainer>

                  
                  <SemmiTitle>B. 정보 관리</SemmiTitle>
                  <SemmiSummary>{ summary3 }</SemmiSummary> {/* 여기를 수정했습니다 */}

                  <TableContainer> 
                      <StyledTable dataSource={dataSource3} columns={columns3} pagination={false} />
                  </TableContainer>


                  <SemmiTitle>C. 공급망 관리</SemmiTitle>
                  <SemmiSummary>{ summary4 }</SemmiSummary> {/* 여기를 수정했습니다 */}

                  <TableContainer> 
                      <StyledTable dataSource={dataSource4} columns={columns4} pagination={false} />
                  </TableContainer>


                  <TableContainer> 
                      <StyledTable dataSource={dataSource5} columns={columns4} pagination={false} />
                  </TableContainer>

                  <SemmiTitle>D. 사고 관리</SemmiTitle>
                  <SemmiSummary>{ summary5 }</SemmiSummary> {/* 여기를 수정했습니다 */}

                  <SemmiTitle>사고 관리 프로세스</SemmiTitle>
                  <TableContainer> 
                      <StyledTable dataSource={dataSource6} columns={columns6} pagination={false} />
                  </TableContainer>

                  <SemmiTitle>기업과 협력 업체 간의 보안 정보 공유 및 협력 프로토콜 구축: 추가 고려사항</SemmiTitle>
                  <TableContainer> 
                      <StyledTable dataSource={dataSource7} columns={columns7} pagination={false} />
                  </TableContainer>


                  <SemmiTitle>E. 클라우드 지침</SemmiTitle>
                  <SemmiSummary>{ summary6 }</SemmiSummary> {/* 여기를 수정했습니다 */}

                  <SemmiTitle>클라우드 환경에 대한 추가 보안 조치</SemmiTitle>
                  <TableContainer> 
                      <StyledTable dataSource={dataSource8} columns={columns8} pagination={false} />
                  </TableContainer>

                  <Title>3. 인적 보안 </Title>
                  <Summary>{ summary7 }</Summary>

                  <SemmiTitle>인력 고용 시 고려사항</SemmiTitle>

                  <TableContainer> 
                      <StyledTable dataSource={dataSource9} columns={columns9} pagination={false} />
                  </TableContainer>

                  <Title>4. 물리 보안 </Title>
                  <Summary>{ summary8 }</Summary>
                  <SemmiTitle>물리보안 이행지침</SemmiTitle>
                  <TableContainer> 
                      <StyledTable dataSource={dataSource10} columns={columns10} pagination={false} />
                  </TableContainer>

                  <Title>5. 기술 보안 </Title>
                  <Summary>{ summary9 }</Summary>
                  <TableContainer> 
                      <StyledTable dataSource={dataSource11} columns={columns11} pagination={false} />
                  </TableContainer>


              </ResourceContainer>
            </div>
        </div>
    );
  }


export default ManageHuman;






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
const SemmiTitle2 = styled.div`
position: relative; /* 가상 요소의 위치 기준점 설정 */
padding-top: 20px;
padding-left: 20px;
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


/// Table 

// const TH = styled.th`
// background-color: #f2f2f2; // 헤더의 배경색을 지정
// color: #333;
// padding: 8px;
// text-align: left;
// font-weight: bold;
// border-bottom: 1px solid #ddd; // 테두리 스타일 추가
// `;

// const Th = styled.th`
//     background-color: #f2f2f2; // 헤더의 배경색을 지정
//     color: #333;
//     padding: 8px;
//     font-size:12px;
//     text-align: center;
//     font-weight: bold;
//     border-bottom: 1px solid #ddd; // 테두리 스타일 추가
// `;

// const Td = styled.td`
//     padding: 8px;
//     text-align: left;
//     border-bottom: 1px solid #ddd; // 테두리 스타일 추가
// `;

// const Table = styled.table`
//     width: 100%; // 테이블 너비를 100%로 설정
//     border-collapse: collapse; // 셀 사이의 간격 없애기
//     // 추가 스타일링이 필요하다면 여기에 추가
// `;

// const TableContainer = styled.div`
//     overflow-x: auto; // 테이블이 너무 클 경우 스크롤바를 표시

// `