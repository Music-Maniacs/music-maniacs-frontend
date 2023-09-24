import React from 'react';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import '../Profiles.scss';
import { MMBox } from '../../../components/MMBox/MMBox';
import { Navtab } from '../../../components/Navtab/Navtab';

type ProfileEventsBoxProps = {
  profile: Artist | Producer | Venue;
};

export const ProfileEventsBox = ({ profile }: ProfileEventsBoxProps) => {
  return (
    <MMBox className="show-boxes info-box">
      <Navtab
        items={[
          { label: 'Próximos Eventos', content: () => <span>Proximos</span> },
          { label: 'Eventos Pasados', content: () => <span>Pasados</span> }
        ]}
      />
    </MMBox>
  );
};
