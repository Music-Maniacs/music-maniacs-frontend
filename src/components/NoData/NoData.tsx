import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/_colors.scss';

type NoDataProps = {
  message: string;
};

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.box_background};
  margin: 0.5rem;
  color: #ffffffc3;
`;

export const NoData = ({ message }: NoDataProps) => {
  return (
    <NoDataContainer>
      <h3>{message}</h3>
    </NoDataContainer>
  );
};
