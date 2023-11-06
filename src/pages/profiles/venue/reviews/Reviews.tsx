import React from 'react';
import { useVenue } from '../context/venueContext';
import { ProfileAllReviews } from '../../components/ProfileAllReviews';
import { Loader } from '../../../../components/Loader/Loader';

const Reviews = () => {
  const { venue, reviewsPolicies } = useVenue();

  return venue ? (
    <ProfileAllReviews profile={venue} reviewableKlass="venue" canReport={reviewsPolicies?.report} />
  ) : (
    <Loader />
  );
};

export default Reviews;
