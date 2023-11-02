import styled from 'styled-components';

export const StyledFlex = styled.div<{
  $width?: string;
  $minWidth?: string;
  $height?: string;
  $maxHeight?: string;
  $gap?: string;
  $padding?: string;
  $margin?: string;
  $borderBottom?: string;
  $borderRadius?: string;
  $cursor?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $overflowX?: string;
  $overflowY?: string;
  $backgroundColor?: string;
}>`
  display: flex;
  width: ${({ $width }) => $width ?? 'auto'};
  min-width: ${({ $minWidth }) => $minWidth ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  max-height: ${({ $maxHeight }) => $maxHeight ?? 'none'};
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'normal'};
  align-items: ${({ $alignItems }) => $alignItems ?? 'normal'};
  gap: ${({ $gap }) => $gap ?? '5px'};
  padding: ${({ $padding }) => $padding ?? '0'};
  margin: ${({ $margin }) => $margin ?? '0'};
  border-bottom: ${({ $borderBottom }) => $borderBottom ?? 'none'};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '0'};
  cursor: ${({ $cursor }) => $cursor ?? 'auto'};
  overflow-x: ${({ $overflowX }) => $overflowX ?? 'auto'};
  overflow-y: ${({ $overflowY }) => $overflowY ?? 'auto'};
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? 'transparent'};
`;

export const StyledFlexColumn = styled(StyledFlex)`
  flex-direction: column;
`;
