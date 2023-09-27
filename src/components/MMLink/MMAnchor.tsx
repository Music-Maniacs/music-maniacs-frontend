import React, { CSSProperties, HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';
import './MMLink.scss';

type Props = {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  content: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  style?: CSSProperties;
};

const MMAnchor = ({ href, content, onClick, target = '_blank', style }: Props) => {
  return (
    <a className="mm-link" onClick={onClick} href={href ?? '#'} target={target} rel="noopener noreferrer" style={style}>
      {content}
    </a>
  );
};

export default MMAnchor;
