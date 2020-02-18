import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { isMobile } from "utils/isMobile";

const Menu = styled.div`
  padding: calc(var(--em) * 2) var(--em);
`;

const Label = styled.span`
  color: rgba(255, 255, 255, 0.98);
  font-weight: var(--text-heavy);
  margin: 0 var(--em);
`;

const FirstTeam = styled.span`
  color: ${props => AccentMap[props.color]};
  background-color: ${props => props.color};
  font-size: var(--text-small);
  font-weight: var(--text-medium);
  padding: calc(var(--em) / 2) var(--em);
  border-radius: var(--radius);
`;

const Seed = styled.input`
  width: 60px;
  border: none;
  padding: calc(var(--em) / 1);
  color: var(--grey-dark-3);
  font-weight: var(--text-semi-bold);
  background-color: rgba(255, 255, 255, 0.98);
  font-size: var(--text-large);
  border-radius: var(--radius);
  text-align: left;
  margin: 0;
  &::placeholder {
    color: var(--grey-dark-2);
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
  background-color: ${props =>
    props.disabled ? "rgba(255,255,255,0.25)" : "var(--primary)"};
  font-size: var(--text-large);
  font-weight: var(--text-semi-bold);
  color: ${props =>
    props.disabled ? "rgba(255,255,255,0.68)" : "var(--grey-dark-2)"};
  margin: 0 var(--em);
  &:hover {
    cursor: ${props => (props.disabled ? "default" : "pointer")};
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
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let id = setInterval(() => {
      if (start) {
        setCount(Math.floor((Date.now() - start) / 1000));
      }
    }, 100);
    return () => clearInterval(id);
  }, [start]);

  return (
    <Row component={Menu} align={"center"} nogutter>
      <Col>
        <form>
          <Label>Board</Label>
          <Seed
            placeholder={seed}
            maxLength={4}
            type={"text"}
            onChange={e => changeNewSeed(e.target.value)}
          />
          <Button
            type={"submit"}
            onClick={() => changeSeed(newSeed)}
            disabled={
              newSeed === seed || newSeed === "" || parseInt(newSeed) === 0
            }
          >
            Load
          </Button>
        </form>
      </Col>
      {!isMobile && (
        <Col xs={2} align={"end"}>
          {start && <Label>{count}</Label>}
          <Button onClick={() => setStart(Date.now())}>
            {start || count > 0 ? "Reset" : "Start Timer"}
          </Button>
        </Col>
      )}
      {isMobile && (
        <Col xs={"content"} align={"center"}>
          <FirstTeam color={ColorMap[startingTeam]}>Team 1</FirstTeam>
        </Col>
      )}
    </Row>
  );
};
