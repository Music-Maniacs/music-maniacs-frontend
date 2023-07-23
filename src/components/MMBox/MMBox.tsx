import React from 'react';
import './MMBox.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const MMBox = ({ children, className }: Props) => {
  return <div className={`mm-box ${className ?? ''}`}>{children}</div>;
};
