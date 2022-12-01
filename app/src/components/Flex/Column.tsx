import styled, { css } from "styled-components";
import { Props } from "./types";

export const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  ${({ justify, align }) => css`
    ${justify ? `justify-content: ${justify};` : ""}
    ${align ? `align-items: ${align};` : ""}
  `}
`;
