import React from 'react';
import MMLink from '../MMLink/MMLink';
import styled from 'styled-components';

type BreadcrumbProps = {
  items: {
    label: string;
    to?: string;
    onClick?: () => void;
  }[];
};

const StyledBreadcrumb = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 10px 0;
`;

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <StyledBreadcrumb>
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.to || item.onClick ? (
              <MMLink content={item.label} to={item.to} onClick={item.onClick} />
            ) : (
              <span>{item.label}</span>
            )}
            {index !== items.length - 1 && <span> / </span>}
          </React.Fragment>
        );
      })}
    </StyledBreadcrumb>
  );
};
