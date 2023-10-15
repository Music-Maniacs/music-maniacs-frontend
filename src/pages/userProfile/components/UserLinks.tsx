import { styled } from 'styled-components';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { Link } from '../../../models/Link';
import MMAnchor from '../../../components/MMLink/MMAnchor';

const UserProfileLinksContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 20px; */
`;

type UserLinksProps = {
  links?: Link[];
};
export const UserLinks = ({ links }: UserLinksProps) => {
  return (
    <UserProfileLinksContainer>
      <MMSubTitle content="Enlaces" />

      {links && (
        <ul style={{ marginTop: '3px', display: 'flex', flexDirection: 'column' }}>
          {links.map((link) => (
            <li key={link.id}>
              <MMAnchor style={{ wordBreak: 'break-all' }} href={link.url ?? '#'} content={link.title} />
            </li>
          ))}
        </ul>
      )}
    </UserProfileLinksContainer>
  );
};
