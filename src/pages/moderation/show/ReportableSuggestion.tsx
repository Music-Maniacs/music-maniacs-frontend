import React from 'react';
import { Report } from '../../../models/Report';
import { SuggestionDuplicatedProfile } from './suggestion/SuggestionDuplicatedProfile';
import { SuggestionDuplicatedEvent } from './suggestion/SuggestionDuplicatedEvent';
import { SuggestionIncorrectProfile } from './suggestion/SuggestionIncorrectProfile';

type ReportableContentProps = {
  report: Report;
};

const eventSuggestionMap = {
  duplicated: SuggestionDuplicatedEvent,
  incorrect_artist: SuggestionIncorrectProfile,
  incorrect_producer: SuggestionIncorrectProfile,
  incorrect_venue: SuggestionIncorrectProfile
};

export const ReportableSuggestion = ({ report }: ReportableContentProps) => {
  const isProfile = ['Venue', 'Artist', 'Producer'].includes(report.reportable_type);

  if (isProfile && report.category === 'duplicated' && report.suggestion) {
    return <SuggestionDuplicatedProfile report={report} />;
  }

  const isEvent = report.reportable_type === 'Event';

  if (!isEvent) {
    return <></>;
  }

  // @ts-ignore
  const Content = eventSuggestionMap[report.category];

  return Content ? <Content report={report} /> : <></>;
};
