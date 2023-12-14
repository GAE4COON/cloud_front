import React from "react";
import { Row, Col } from "antd";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-wrap">
        <Row>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer-center">
            
              <h4>Office: 서울 금천구 가산디지털1로 145</h4>
              <h4>
                에이스하이엔드타워 3차 제1004호, 1004-2 (08506)
              </h4>
              <h4>Belong: Kitri, BoB 12th</h4>
            
            </div>
          </Col>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Go To Links</h2>
              <h4>
                <a href="https://aws.amazon.com/ko/">AWS</a>
              </h4>
              <h4>
                <a href="https://www.kitribob.kr/">Best of the Best</a>
              </h4>
              <h4>
                <a href="https://www.kitri.re.kr/">KTRI</a>
              </h4>
            </div>
          </Col>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Ligal</h2>
              <h4>ISO27001</h4>
              <h4>ISO27017</h4>
              <h4>개인정보처리방침</h4>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={24} sm={24}>
      
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
