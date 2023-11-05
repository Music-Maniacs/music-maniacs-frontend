import { styled } from 'styled-components';
import { MMSubTitle } from '../MMTitle/MMTitle';
import { Link } from '../../models/Link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { ReactElement } from 'react';
import { FaTicket } from 'react-icons/fa6';
import { NoData } from '../NoData/NoData';

const LinksContainer = styled.div`
  max-width: 150px;
  min-width: 100px;
  overflow: hidden;
  padding: 5px;
`;
const LinksGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 5px;
`;

const LinkLine = styled.a`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  position: relative;
  color: var(--text_color);

  text-decoration: none;
  width: fit-content;

  &:hover {
    color: var(--text_color);
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: var(--text_color);
    transform: scaleX(0);
    transform-origin: top left;
    transition: transform 0.2s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

type LinkGroupProps = {
  links?: Link[];
  noDataMessage?: string;
};
export const MMLinksGroup = ({ links, noDataMessage }: LinkGroupProps) => {
  const LinkToIcon = (link: string): ReactElement<any, any> => {
    const socialWebsites = [
      { Icon: <FaFacebook />, pattern: /facebook\.com/i },
      { Icon: <FaTwitter />, pattern: /twitter\.com/i },
      { Icon: <FaInstagram />, pattern: /instagram\.com/i },
      { Icon: <FaLinkedin />, pattern: /linkedin\.com/i },
      { Icon: <FaYoutube />, pattern: /youtube\.com/i },
      { Icon: <FaTicket />, pattern: /ticketmaster\.com/i },
      { Icon: <FaTicket />, pattern: /ticketek\.com/i },
      { Icon: <FaTicket />, pattern: /entradaweb\.com/i },
      { Icon: <FaTiktok />, pattern: /tiktok\.com/i }
    ];

    for (const site of socialWebsites) {
      if (site.pattern.test(link)) {
        return site.Icon;
      }
    }
    //no match
    return <BiWorld />;
  };

  return (
    <LinksContainer>
      <MMSubTitle content="Enlaces" />

      {links && links.length > 0 ? (
        <LinksGroup>
          {links.map((link) => (
            <LinkLine key={link.id} href={link.url ?? '#'} target="_blank">
              {LinkToIcon(link.url)}
              <span>{link.title}</span>
            </LinkLine>
          ))}
        </LinksGroup>
      ) : (
        <NoData message={noDataMessage ? noDataMessage : 'No hay links'} />
      )}
    </LinksContainer>
  );
};
