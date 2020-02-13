import React, { useState, useEffect } from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";

const Tile = styled.div`
  box-shadow: 0px 0px 0px 1px var(--background);
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

const AccentMap = {
  "var(--team-1)": "var(--team-1-accent)",
  "var(--team-2)": "var(--team-2-accent)",
  "var(--neutral)": "var(--neutral-accent)",
  "var(--death)": "var(--death-accent)"
};

const Clue = styled.div`
  font-weight: var(--text-semi-bold);
  font-size: var(--text-big);
  color: ${props =>
    props.revealed ? AccentMap[props.color] : "var(--grey-dark-3)"};
`;

export function Card({ color, content, revealed, updating }) {
  const [reveal, setReveal] = useState(revealed);
    useEffect( () => {
        if (updating) {
            setReveal(revealed);
        };
    }, [revealed, updating]);

    return (
            <Col
        component={Tile}
        xs={3}
        align={"center"}
        color={reveal && !updating ? color : "#FFF"}
        onClick={() => setReveal(true)}
            >
            <Clue revealed={reveal} color={color}>
            {content}
        </Clue>
            </Col>
    );
};
