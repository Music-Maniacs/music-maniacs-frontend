import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import styled from 'styled-components';

const StyledUserAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

interface UserAvatarProps {
  anonymous: boolean;
  profile_image_full_url?: string;
}

export const UserAvatar = ({ anonymous, profile_image_full_url }: UserAvatarProps) => {
  const [imgHasError, setImgHasError] = useState(false);
  return (
    <StyledUserAvatarContainer>
      {!profile_image_full_url || imgHasError || anonymous ? (
        <BiUserCircle size={'2rem'} />
      ) : (
        <StyledImage alt="Perfil de usuario" src={profile_image_full_url} onError={() => setImgHasError(true)} />
      )}
    </StyledUserAvatarContainer>
  );
};
