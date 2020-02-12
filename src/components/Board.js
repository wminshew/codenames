import React, { useState, useEffect } from "react";
import { Row } from "react-grid-system";
import styled from "styled-components";

const Background = styled.div`
  background-color: #000;
`;

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export function Board(props) {
  const size = useWindowSize();
  return (
    <Row
      component={Background}
      gutterWidth={8}
      style={{ height: size.height - 80 }}
    >
      {props.children}
    </Row>
  );
}
