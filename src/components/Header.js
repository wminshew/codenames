import React from "react";
import { Row, Col, Hidden } from "react-grid-system";
import styled from "styled-components";
import { isMobile } from "utils/isMobile"

const Menu = styled.div`
  padding: calc(var(--em) * 2);
  margin-bottom: var(--em);
`;

const Title = styled.div`
  font-weight: var(--text-heavy);
  color: var(--grey-dark-3);
`;

const Seed = styled.input`
  width: 80px;
  border: none;
  padding: calc(var(--em) / 1);
  color: var(--primary-dark-2);
  font-weight: var(--text-medium);
  background-color: var(--primary-light-2);
  box-shadow: 0px 0px 0px 1px var(--primary-light-1);
  font-size: var(--text-large) px;
  border-radius: var(--radius);
  text-align: center;
  margin: 0 var(--em);
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  transition: var(--transition);
  border: none;
  padding: var(--em) calc(var(--em) * 2);
  border-radius: var(--radius);
  background-color: var(--primary);
  font-size: var(--text-large) px;
  font-weight: var(--text-heavy);
  color: var(--primary-light-2);
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
  <Row component={Menu} align={"center"} nogutter>
    {!isMobile && (
      <Col xs={"content"}>
        <Title>Codenames</Title>
      </Col>
    )}
    <Col align={"center"}>
      Board ID
      <Seed placeholder={"1234"} maxLength={4} type={"text"} />
      <Button>Load Board</Button>
    </Col>
    {!isMobile && (
      <Col xs={"content"} align={"end"}>
        <Button>Timer</Button>
      </Col>
    )}
  </Row>
);
