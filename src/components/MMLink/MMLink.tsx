import React from 'react';
import { Link, To } from 'react-router-dom';
import './MMLink.scss';

type Props = {
  to?: To;
  content: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const MMLink = ({ to, content, onClick }: Props) => {
  return (
    <Link to={to ?? '..'} className="mm-link" onClick={onClick}>
      {content}
    </Link>
  );
};

export default MMLink;
