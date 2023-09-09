import React from 'react';
import './MMContainer.scss';

type Props = {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children: React.ReactNode;
  className?: string;
};
export const MMContainer = ({ maxWidth = 'xxl', children, className }: Props) => {
  return <div className={`mm-container--${maxWidth} ${className ?? ''}`}>{children}</div>;
};
