import React from 'react';
import { Report } from '../../../../models/Report';
import { Artist } from '../../../../models/Artist';
import { Producer } from '../../../../models/Producer';
import { Venue } from '../../../../models/Venue';
import { ProfileBasicInfo } from '../../../profiles/components/ProfileBasicInfo';
import { FaSearch } from 'react-icons/fa';
import { MMButtonLink } from '../../../../components/MMButton/MMButtonLink';

type ReportableProfileProps = {
  report: Report;
};

export const ReportableProfile = ({ report }: ReportableProfileProps) => {
  const profile = report.reportable as unknown as Artist | Producer | Venue;

  const profileKlass = report.reportable_type as unknown as 'Venue' | 'Artist' | 'Producer';

  return (
    <ProfileBasicInfo
      profile={profile}
      hideActions={true}
      customActions={<LinkToProfile profile={profile} profileKlass={profileKlass} />}
    />
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
