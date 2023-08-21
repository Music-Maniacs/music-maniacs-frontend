import React from 'react';
import './MMContainer.scss';

type Props = {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children: React.ReactNode;
};
export const MMContainer = ({ maxWidth = 'xxl', children }: Props) => {
  return <div className={`mm-container--${maxWidth}`}>{children}</div>;
};
