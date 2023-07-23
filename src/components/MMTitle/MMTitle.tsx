import React from 'react';
import './MMTitle.scss';

type Props = {
  content: string;
};

export const MMTitle = ({ content }: Props) => {
  return <h1 className='mm-title'>{content}</h1>;
};
