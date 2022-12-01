import React from "react";
import styled from "styled-components";
import { Column } from "../../Flex/Column";
import { Row } from "../../Flex/Row";
import { Spacer } from "../../Spacer";
import { Boundary } from "./Boundary";
import { BOUNDARIES } from "./utils";

type Props = ContainerProps & {
  category: string;
};

export const Key: React.FC<Props> = ({ category, position }) => {
  return (
    <Container align="center" {...{ position }}>
      <Text>Number of retailers buying {category} on Faire</Text>
      <Spacer height={16} />
      <Row>
        {BOUNDARIES.map((boundary, index) => (
          <Boundary key={index} {...boundary} />
        ))}
      </Row>
    </Container>
  );
};

export const KEY_WIDTH = 440;

type ContainerProps = {
  position: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
};

const Container = styled(Column)<ContainerProps>`
  position: absolute;
  ${({ position }) => `
    ${position.top ? `top: ${position.top}px;` : ""}
    ${position.left ? `left: ${position.left}px;` : ""}
    ${position.bottom ? `bottom: ${position.bottom}px;` : ""}
    ${position.right ? `right: ${position.right}px;` : ""}
  `}
  z-index: 1;
  width: ${KEY_WIDTH}px;
  background-color: white;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid black;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
  font-size: 14px;
`;
