import React from 'react';
import { styled } from 'styled-components';
import { Event } from '../../../models/Event';
import { formatDate } from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { MMDateIcon } from '../../../components/icons/MMDateIcon';
import { MMArtistIcon } from '../../../components/icons/MMArtistIcon';
import { MMVenueIcon } from '../../../components/icons/MMVenueIcon';

type Props = {
  event: Event;
};

const StyledCardContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 180px;
  max-width: 270px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255, 60%);
  color: black;
  overflow: hidden;
  cursor: pointer;
  padding-bottom: 2rem;
  &:hover {
    scale: 1.01;
  }
`;

// Image
const StyledCardImageContainer = styled.div`
  width: 100%;
  height: 150px;
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Data
const StyledCardDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 10px;
`;

const StyledIconWLabel = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
`;

const StyledCardTitle = styled.h3`
  margin: 0.3rem 0 0.3rem 0;
`;

export const EventCard = ({ event }: Props) => {
  const navigate = useNavigate();

  return (
    <StyledCardContainer onClick={() => navigate(`/events/${event.id}`)}>
      {/* Image */}
      <StyledCardImageContainer>
        <StyledCardImage src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg" />
      </StyledCardImageContainer>

      <StyledCardDataContainer>
        <StyledCardTitle>{event.name}</StyledCardTitle>

        {/* Date */}
        <StyledIconWLabel>
          <StyledIconContainer>
            <MMDateIcon />
          </StyledIconContainer>
          <span>{formatDate({ date: event.datetime, format: 'slashWithTime' })}</span>
        </StyledIconWLabel>

        {/* Artist */}
        <StyledIconWLabel>
          <StyledIconContainer>
            <MMArtistIcon />
          </StyledIconContainer>
          <span>{event.artist.name}</span>
        </StyledIconWLabel>

        {/* Venue */}
        <StyledIconWLabel>
          <StyledIconContainer>
            <MMVenueIcon />
          </StyledIconContainer>
          <span>{event.venue.name}</span>
        </StyledIconWLabel>

        <span>{event.description}</span>
      </StyledCardDataContainer>
    </StyledCardContainer>
  );
};
