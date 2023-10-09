import { styled } from 'styled-components';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { Link } from '../../../models/Link';

const UserProfileLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type UserLinksProps = {
  links?: Link[];
};
export const UserLinks = ({ links }: UserLinksProps) => {
  return (
    <UserProfileLinksContainer>
      <MMSubTitle content="Enlaces" />

      {links ? (
        <ul style={{ marginTop: '3px' }}>
          {links.map((link) => (
            <li key={link.id}>{`${link.title}: ${link.url}`}</li>
          ))}
        </ul>
      ) : (
        <span>-</span>
      )}
    </UserProfileLinksContainer>
  );
};
