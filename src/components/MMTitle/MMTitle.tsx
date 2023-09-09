import React from 'react';
import './MMTitle.scss';

type Props = {
  content: string;
};

export const MMTitle = ({ content }: Props) => {
  return <h1 className="mm-title">{content}</h1>;
};

export const MMSubTitle = ({ content }: Props) => {
  return <h3 className="mm-subtitle">{content}</h3>;
};
