import styled from 'styled-components';

export const StyledFlex = styled.div<{
  $gap?: string;
  $padding?: string;
  $margin?: string;
  $borderBottom?: string;
  $cursor?: string;
  $justifyContent?: string;
}>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'normal'};
  gap: ${({ $gap }) => $gap ?? '5px'};
  padding: ${({ $padding }) => $padding ?? '0'};
  margin: ${({ $margin }) => $margin ?? '0'};
  border-bottom: ${({ $borderBottom }) => $borderBottom ?? 'none'};
  cursor: ${({ $cursor }) => $cursor ?? 'auto'};
`;

export const StyledFlexColumn = styled(StyledFlex)`
  flex-direction: column;
`;
