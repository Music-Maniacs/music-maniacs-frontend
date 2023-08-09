import React from 'react';
import './MMContainer.scss';

type Props = {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
};
export const MMContainer = ({ maxWidth = 'sm', children }: Props) => {
  return <div className={`mm-container--${maxWidth}`}>{children}</div>;
};
