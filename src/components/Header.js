import React from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

const Title = styled.p`
  padding: 0;
  margin: 0;
  font-weight: var(--text-heavy);
  &:hover {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  padding: var(--em) 0;
  margin-bottom: var(--em);
`;
const Item = styled.button`
  transition: var(--transition);
  border: none;
  padding: var(--em);
  border-radius: var(--radius);
  background-color: rgba(0, 0, 0, 0.14);
  font-size: 14px;
  font-weight: var(--text-medium);
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.24);
  }
  &:active {
    background-color: #ccc;
  }
  &:focus {
    outline: none;
  }
`;

export const Header = () => (
  <Row component={Menu} gutterWidth={8} align={"center"}>
    <Col>
      <Title>Gameboard</Title>
    </Col>
    <Col xs={"content"}>
      <Item>Settings</Item>
    </Col>
  </Row>
);
