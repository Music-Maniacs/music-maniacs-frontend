import React from 'react';
import { Report } from '../../../../models/Report';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { useNavigate } from 'react-router-dom';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';
import { Artist } from '../../../../models/Artist';
import { Producer } from '../../../../models/Producer';
import { Venue } from '../../../../models/Venue';
import { ProfileBasicInfo } from '../../../profiles/components/ProfileBasicInfo';

type SuggestionDuplicatedProfileProps = {
  report: Report;
};

export const SuggestionDuplicatedProfile = ({ report }: SuggestionDuplicatedProfileProps) => {
  const profile = report.suggestion as unknown as Artist | Producer | Venue;

  const profileKlass = report.reportable_type as unknown as 'Venue' | 'Artist' | 'Producer';

  return (
    <>
      <br />

      <MMSubTitle content="Perfil Original" />

      <ProfileBasicInfo
        profile={profile}
        hideActions={true}
        customActions={<LinkToProfile profile={profile} profileKlass={profileKlass} />}
      />
    </>
  );
};

type LinkToProfileProps = {
  profile: Artist | Producer | Venue;
  profileKlass: 'Artist' | 'Producer' | 'Venue';
};

const LinkToProfile = ({ profile, profileKlass }: LinkToProfileProps) => {
  const navigate = useNavigate();

  return (
    <MMButton onClick={() => navigate(`/profiles/${profileKlass.toLowerCase()}s/${profile.id}`)}>
      <FaSearch />
      Ver Perfil
    </MMButton>
  );
};
