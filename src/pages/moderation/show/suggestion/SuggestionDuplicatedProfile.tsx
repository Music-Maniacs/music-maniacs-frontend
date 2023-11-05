import React from 'react';
import { Report } from '../../../../models/Report';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { FaSearch } from 'react-icons/fa';
import { Artist } from '../../../../models/Artist';
import { Producer } from '../../../../models/Producer';
import { Venue } from '../../../../models/Venue';
import { ProfileBasicInfo } from '../../../profiles/components/ProfileBasicInfo';
import { MMButtonLink } from '../../../../components/MMButton/MMButtonLink';

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
  return (
    <MMButtonLink to={`/profiles/${profileKlass.toLowerCase()}s/${profile.id}`}>
      <FaSearch />
      Ver Perfil
    </MMButtonLink>
  );
};
