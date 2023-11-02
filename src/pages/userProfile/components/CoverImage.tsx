import { Grid } from '@mui/material';
import { styled } from 'styled-components';
import { Image } from '../../../models/Image';

const UserProfileCoverImage = styled(Grid)`
  width: 100%;
  max-height: 150px;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: fill;
  }
`;

type CoverImageProps = {
  coverImage: Image | undefined;
};
export const CoverImage = ({ coverImage }: CoverImageProps) => {
  return (
    <>
      {coverImage && (
        <UserProfileCoverImage item>
          <img src={coverImage.full_url} alt="Imagen de perfil" />
        </UserProfileCoverImage>
      )}
    </>
  );
};
