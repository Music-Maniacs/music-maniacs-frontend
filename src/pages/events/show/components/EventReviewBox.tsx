import React from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Event } from '../../../../models/Event';

type Props = {
  event: Event;
};

export const EventReviewBox = ({ event }: Props) => {
  return <MMBox className="show-boxes">Reviews</MMBox>;
};
