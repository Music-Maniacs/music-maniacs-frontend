import React from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Event } from '../../../../models/Event';

type Props = {
  event: Event;
};

export const EventCommentBox = ({ event }: Props) => {
  return <MMBox className="show-boxes">Comments</MMBox>;
};
