import React, { useState } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { isMobile } from "utils/isMobile";

const Menu = styled.div`
  padding: calc(var(--em) * 2);
  margin-bottom: var(--em);
`;

const Title = styled.div`
  font-weight: var(--text-heavy);
  color: var(--primary);
  font-size: var(--text-big);
`;

const Label = styled.span`
  color: var(--primary);
  font-weight: var(--text-heavy);
`;

const FirstTeam = styled.span`
  color: ${props => AccentMap[props.color]};
  background-color: ${props => props.color};
  font-size: var(--text-large);
  font-weight: var(--text-medium);
  padding: calc(var(--em) / 2) var(--em);
  border-radius: var(--radius);
`;

const Seed = styled.input`
  width: 80px;
  border: none;
  padding: calc(var(--em) / 1);
  color: var(--grey-dark-3);
  font-weight: var(--text-semi-bold);
  background-color: var(--grey-light-3);
  font-size: var(--text-large) px;
  border-radius: var(--radius);
  text-align: center;
  margin: 0 var(--em);
  text-transform: lowercase;
  &::placeholder {
    color: var(--grey-dark-1);
  }
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
  font-weight: var(--text-semi-bold);
  color: var(--primary-light-2);
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const ColorMap = {
  0: "var(--team-1)",
  1: "var(--team-2)"
};

const AccentMap = {
  "var(--team-1)": "var(--team-1-accent)",
  "var(--team-2)": "var(--team-2-accent)",
  "var(--neutral)": "var(--neutral-accent)",
  "var(--death)": "var(--death-accent)"
};

export const Header = ({ seed, changeSeed, startingTeam }) => {
  const [newSeed, changeNewSeed] = useState(seed);
  return (
    <Row component={Menu} align={"center"} nogutter>
      {!isMobile && (
        <Col xs={"content"}>
          <Title>Codenames</Title>
        </Col>
      )}
      <Col align={isMobile ? "start" : "center"}>
        <Label>Board ID</Label>
        <Seed
          placeholder={seed}
          maxLength={4}
          type={"text"}
          onChange={e => changeNewSeed(e.target.value)}
        />
        <Button type={"submit"} onClick={() => changeSeed(newSeed)}>
          Load Board
        </Button>
      </Col>
      {!isMobile && (
        <Col xs={"content"} align={"end"}>
          <Button>Timer</Button>
        </Col>
      )}
      {isMobile && (
        <Col xs={"content"} align={"end"}>
          <FirstTeam color={ColorMap[startingTeam]}>Starting Team</FirstTeam>
        </Col>
      )}
    </Row>
  );
};
