import styled, { css } from "styled-components";
import { Props } from "./types";

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  ${({ justify, align }) => css`
    ${justify ? `justify-content: ${justify};` : ""}
    ${align ? `align-items: ${align};` : ""}
  `}
`;
