import React, { useState, useEffect } from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";

const AccentMap = {
  "var(--team-1)": "var(--team-1-accent)",
  "var(--team-2)": "var(--team-2-accent)",
  "var(--neutral)": "var(--neutral-accent)",
  "var(--death)": "var(--death-accent)"
};

const Tile = styled.div`
  box-shadow: 0px 0px 0px 1px var(--grey-dark-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.color};
  text-align: center;
  text-transform: lowercase;
  &:hover {
    cursor: pointer;
  }
`;

const Clue = styled.div`
  font-weight: ${props =>
    props.isMobile ? "var(--text-medium)" : "var(--text-semi-bold)"};
  font-size: ${props =>
    props.isMobile ? "var(--text-large)" : "var(--text-big)"};
  color: ${props =>
    props.revealed ? AccentMap[props.color] : "var(--grey-dark-3)"};
`;

export function Card({
  key,
  color,
  content,
  isMobile,
  updating,
  addCardToScore
}) {
  const [reveal, setReveal] = useState(isMobile);

  useEffect(() => {
    if (updating) {
      setReveal(isMobile);
    }
  }, [isMobile, updating]);
  useEffect(() => {
    if (reveal) {
      addCardToScore();
    }
  }, [reveal]);

  return (
    <Col
      component={Tile}
      xs={3}
      align={"center"}
      color={reveal && !updating ? color : "#FFF"}
      onClick={() => setReveal(true)}
    >
      <Clue isMobile={isMobile} revealed={reveal} color={color}>
        {content}
      </Clue>
    </Col>
  );
}
