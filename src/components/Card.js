import React, { useState } from "react";
import { Col } from "react-grid-system";
import styled from "styled-components";

const Background = styled.div`
  background-color: ${props => props.color || "#FFF"};
  text-align: center;
  box-shadow: 0px 0px 0px 2px var(--grey-dark-2);
  &:hover {
    cursor: pointer;
  }
`;

export function Card({ color, content }) {
  const [revealed, setReveal] = useState(false);
  if (!revealed) {
    return (
      <Col
        component={Background}
        xs={4}
        align={"center"}
        color={revealed ? color : "#FFF"}
        onClick={() => setReveal(!revealed)}
      >
        <p>{content}</p>
      </Col>
    );
  }
  if (revealed) {
    return (
      <Col
        component={Background}
        xs={4}
        align={"center"}
        color={revealed ? color : "#FFF"}
        onClick={() => setReveal(!revealed)}
      >
        <p>ths card has been revealed</p>
      </Col>
    );
  }
  return null;
}
