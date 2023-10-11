import React from "react";
import { Row, Col } from "antd";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-wrap">
        <Row>
          <Col lg={12} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Gae4coon</h2>
              <h4>Kitri BoB 12th, 가산동 에이스 하이엔드타워 1004-2</h4>
            </div>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Quick Links</h2>
              <h4>
                <a href="">Link 1</a>
              </h4>
              <h4>
                <a href="#">Link 2</a>
              </h4>
              <h4>
                <a href="#">Link 2</a>
              </h4>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={24} sm={24}>
          <p>© 2023 Gae4coon</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
