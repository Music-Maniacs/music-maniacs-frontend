import { styled } from 'styled-components';

export const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const StyledFloatRight = styled.div`
  float: right;
`;

export const StyledDataContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 10px;

  width: 90%;
`;

export const StyledBoldText = styled.span`
  font-weight: 600;
`;

export const StyledLinksContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

export const StyledImageScaledDown = styled.img`
  width: 100%;
  object-fit: scale-down;
  max-height: 300px;
`;
