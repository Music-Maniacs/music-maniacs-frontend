import React from 'react';
import styled from 'styled-components';

type NoDataProps = {
  message: string;
  style?: React.CSSProperties;
};

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--highlight);
  margin: 0.5rem;
  color: var(--text_color);
  opacity: 0.7;
`;

export const NoData = ({ message, style }: NoDataProps) => {
  return (
    <NoDataContainer style={style}>
      <h3>{message}</h3>
    </NoDataContainer>
  );
};
