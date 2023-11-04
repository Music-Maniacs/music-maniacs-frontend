import React from 'react';
import { Report, reportableTypeTranslated } from '../../../../models/Report';
import { Artist } from '../../../../models/Artist';
import { Producer } from '../../../../models/Producer';
import { Venue } from '../../../../models/Venue';
import { useNavigate } from 'react-router-dom';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { ProfileBasicInfo } from '../../../profiles/components/ProfileBasicInfo';

type SuggestionIncorrectProfileProps = {
  report: Report;
};

const profileKlassMap = {
  incorrect_artist: 'Artist',
  incorrect_producer: 'Producer',
  incorrect_venue: 'Venue'
};

export const SuggestionIncorrectProfile = ({ report }: SuggestionIncorrectProfileProps) => {
  const profile = report.suggestion as unknown as Artist | Producer | Venue;

  // @ts-ignore
  const profileKlass = profileKlassMap[report.category];

  return (
    <>
      <br />

      {/* @ts-ignore */}
      <MMSubTitle content={`${reportableTypeTranslated[profileKlass]} Correcto`} />

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
