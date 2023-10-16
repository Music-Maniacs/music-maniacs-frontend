import React, { useState } from 'react';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { StyledFlex, StyledFlexColumn } from '../../../../styles/styledComponents';
import { MMVenueIcon } from '../../../../components/icons/MMVenueIcon';
import { Venue } from '../../../../models/Venue';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { LeafletMap } from '../../../../components/forms/venues/LeafletMap';

type Props = {
  venue: Venue;
};
export const VenueMapInfo = ({ venue }: Props) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const toggleShowMap = () => {
    setIsMapOpen((prevState) => !prevState);
  };

  return (
    <>
      <MMSubTitle content="Ubicación" />

      <StyledFlexColumn $gap="7px" $margin="15px 0px 0px 0px">
        <StyledFlex>
          <MMVenueIcon />

          <h4 style={{ margin: '0' }}>{venue.address}</h4>
        </StyledFlex>

        {venue.location?.latitude && venue.location.longitude && (
          <>
            <StyledFlex $cursor="pointer" onClick={toggleShowMap} $width="fit-content">
              {isMapOpen ? <BiChevronUp /> : <BiChevronDown />} Mostrar Mapa
            </StyledFlex>

            {isMapOpen && (
              <LeafletMap
                latitude={+venue.location.latitude}
                longitude={+venue.location.longitude}
                hasClickEvent={false}
                width="100%"
                height="350px"
              />
            )}
          </>
        )}
      </StyledFlexColumn>
    </>
  );
};
