import React from "react";
import styled from "styled-components";
import { Column } from "../../Flex/Column";
import { Spacer } from "../../Spacer";
import { BoundaryType } from "./types";
import { getBoundaryText } from "./utils";

type Props = BoundaryType & {
  color: string;
};

export const Boundary: React.FC<Props> = ({ color, lower, upper }) => {
  return (
    <Column align="center">
      <Block {...{ color }} />
      <Spacer height={8} />
      <Text>{getBoundaryText({ lower, upper })}</Text>
    </Column>
  );
};

const Block = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  width: 98px;
  height: 12px;
  border: solid 1px #757575;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
  font-size: 14px;
`;
