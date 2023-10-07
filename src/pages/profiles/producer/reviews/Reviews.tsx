import React from 'react';
import { useProducer } from '../context/producerContext';
import { ProfileAllReviews } from '../../components/ProfileAllReviews';
import { Loader } from '../../../../components/Loader/Loader';

const Reviews = () => {
  const { producer } = useProducer();

  return producer ? <ProfileAllReviews profile={producer} reviewableKlass="producer" /> : <Loader />;
};

export default Reviews;
