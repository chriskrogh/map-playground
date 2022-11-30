import React from "react";
import styled from "styled-components";

type Props = {
  retailerCount: number;
  regionName: string;
};

export const InfoWindow: React.FC<Props> = ({ retailerCount, regionName }) => {
  return (
    <Container>
      <Title>{retailerCount} retailers</Title>
      <Subtitle>{regionName}</Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
`;

const Title = styled.p`
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #333333;
`;

const Subtitle = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #757575;
`;
