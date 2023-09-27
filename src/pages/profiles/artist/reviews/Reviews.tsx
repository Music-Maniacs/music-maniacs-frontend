import React from 'react';
import { useArtist } from '../context/artistContext';
import { ProfileAllReviews } from '../../components/ProfileAllReviews';
import { Loader } from '../../../../components/Loader/Loader';

const Reviews = () => {
  const { artist } = useArtist();

  return artist ? <ProfileAllReviews profile={artist} reviewableKlass="artist" /> : <Loader />;
};

export default Reviews;
