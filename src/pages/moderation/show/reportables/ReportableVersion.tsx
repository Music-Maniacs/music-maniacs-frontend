import React from 'react';
import { Report } from '../../../../models/Report';
import { Version } from '../../../../models/Version';
import { VersionContent } from '../../../../components/versions/VersionContent';

type ReportableVersionProps = {
  report: Report;
};

export const ReportableVersion = ({ report }: ReportableVersionProps) => {
  const version = report.reportable as unknown as Version;

  return <VersionContent version={version} />;
};
