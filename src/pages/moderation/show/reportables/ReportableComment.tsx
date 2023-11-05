import React from 'react';
import { Comment } from '../../../../models/Comment';
import { Report } from '../../../../models/Report';
import { CommentContent } from '../../../../components/Comments/CommentContent';

type ReportableCommentProps = {
  report: Report;
};

export const ReportableComment = ({ report }: ReportableCommentProps) => {
  const comment = report.reportable as unknown as Comment;

  return <CommentContent comment={comment} />;
};
