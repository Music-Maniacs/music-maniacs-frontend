import React from 'react';
import { Link, To } from 'react-router-dom';
import './MMLink.scss';

type Props = {
  to: To;
  content: string;
};

export const MMLink = ({ to, content }: Props) => {
  return (
    <Link to={to} className='mm-link'>
      {content}
    </Link>
  );
};

export default MMLink;
