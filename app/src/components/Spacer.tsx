import styled, { css } from "styled-components";

type Props = {
  width?: number;
  height?: number;
};

export const Spacer = styled.div<Props>`
  ${({ width, height }) => css`
    width: ${width ?? 0}px;
    height: ${height ?? 0}px;
  `}
`;
