import React from 'react';
import { Report } from '../../../models/Report';
import { ReportableReview } from './reportables/ReportableReview';
import { ReportableComment } from './reportables/ReportableComment';
import { ReportableProfile } from './reportables/ReportableProfile';
import { ReportableEvent } from './reportables/ReportableEvent';
import { ReportableVersion } from './reportables/ReportableVersion';
import { ReportableVideo } from './reportables/ReportableVideo';

type ReportableContentProps = {
  report: Report;
};

const reportableTypeMap = {
  Review: ReportableReview,
  Comment: ReportableComment,
  Artist: ReportableProfile,
  Producer: ReportableProfile,
  Venue: ReportableProfile,
  Event: ReportableEvent,
  Version: ReportableVersion,
  Video: ReportableVideo
};

export const ReportableContent = ({ report }: ReportableContentProps) => {
  const Content = reportableTypeMap[report.reportable_type];

  return <Content report={report} />;
};
