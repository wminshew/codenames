import React, { useState } from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";

const MAX_MOBILE_WIDTH = 480;

const Tile = styled.div`
  box-shadow: 0px 0px 0px 4px var(--background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.color};
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const Clue = styled.div`
  font-weight: var(--text-medium);
`;

export function Card({ color, content }) {
  const [revealed, setReveal] = useState(false);
  const isMobile =
    window.innerWidth < MAX_MOBILE_WIDTH ||
    window.innerHeight < MAX_MOBILE_WIDTH;
  return (
    <Col
      component={Tile}
      xs={3}
      align={"center"}
      color={revealed || isMobile ? color : "#FFF"}
      onClick={() => setReveal(true)}
    >
      <Clue>{content}</Clue>
    </Col>
  );
}
