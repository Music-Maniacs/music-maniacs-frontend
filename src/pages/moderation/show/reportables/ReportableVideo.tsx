import React from 'react';
import { Video } from '../../../../models/Video';
import { Report } from '../../../../models/Report';
import { VideoPreview } from '../../../events/multimedia/VideoPreview';

type ReportableVideoProps = {
  report: Report;
};

export const ReportableVideo = ({ report }: ReportableVideoProps) => {
  const video = report.reportable as unknown as Video;

  return <VideoPreview video={video} />;
};
