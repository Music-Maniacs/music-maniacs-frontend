import React from 'react';
import { Review } from '../../../../models/Review';
import { ReviewContent } from '../../../../components/Reviews/ReviewContent';
import { Report } from '../../../../models/Report';

type ReportableReviewProps = {
  report: Report;
};

export const ReportableReview = ({ report }: ReportableReviewProps) => {
  const review = report.reportable as unknown as Review;

  return <ReviewContent review={review} reviewableName={review.reviewable_name} />;
};
