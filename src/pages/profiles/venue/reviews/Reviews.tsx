import React from 'react';
import { useVenue } from '../context/venueContext';
import { ProfileAllReviews } from '../../components/ProfileAllReviews';
import { Loader } from '../../../../components/Loader/Loader';

const Reviews = () => {
  const { venue } = useVenue();

  return venue ? <ProfileAllReviews profile={venue} reviewableKlass="venue" /> : <Loader />;
};

export default Reviews;
