import React, { RefObject } from 'react';
import { Review } from '../../models/Review';
import { Rating } from '@mui/material';
import { FaEdit, FaFlag } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import styled from 'styled-components';
import colors from '../../styles/_colors.scss';
import { StyledFlex, StyledFlexColumn } from '../../styles/styledComponents';
import MMLink from '../MMLink/MMLink';
import { useAuth } from '../../context/authContext';
import { warningSnackbar } from '../Snackbar/Snackbar';
import { UserAvatar } from '../Comments/UserAvatar';

type ReviewContentProps = {
  review: Review;
  reviewableName?: string;
  canEdit?: boolean;
  handleEditReviewButton?: (review: Review) => void;
  canDelete?: boolean;
  handleDeleteReviewButton?: (review: Review) => void;
  handleReportReviewButton?: (review: Review) => void;
  innerRef?: RefObject<HTMLDivElement> | null | ((node: HTMLDivElement) => void);
};

const StyledUserInfoContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const ReviewContent = ({
  review,
  canEdit = false,
  handleEditReviewButton,
  canDelete = false,
  handleDeleteReviewButton,
  reviewableName,
  innerRef,
  handleReportReviewButton
}: ReviewContentProps) => {
  const { created_at, description, rating, user, anonymous } = review;
  const { user: currentUser } = useAuth();

  return (
    <StyledFlexColumn
      ref={innerRef}
      $padding="3px 0px"
      $margin="3px 0px"
      $borderBottom={`1px solid ${colors.input_border}`}
    >
      <StyledUserInfoContainer>
        <UserAvatar anonymous={anonymous} profile_image_full_url={user?.profile_image_full_url} />

        <StyledFlexColumn $gap="2px">
          {anonymous ? <span>Usuario Eliminado</span> : <MMLink content={user?.full_name} to={`/user/${user?.id}`} />}
          <small>{formatDate({ date: created_at, format: 'slash' })}</small>
        </StyledFlexColumn>
      </StyledUserInfoContainer>

      <StyledFlexColumn $gap="7px">
        <StyledFlexColumn $gap="2px">
          <span>{reviewableName} :</span>

          <Rating value={rating} readOnly />
        </StyledFlexColumn>

        <span>{description}</span>

        <StyledFlex>
          {!anonymous && canEdit && (
            <StyledFlex $cursor="pointer" onClick={() => handleEditReviewButton && handleEditReviewButton(review)}>
              <FaEdit />
              <span>Editar</span>
            </StyledFlex>
          )}

          {handleReportReviewButton && (
            <StyledFlex
              $cursor="pointer"
              onClick={() => {
                if (!currentUser) {
                  warningSnackbar('Debe iniciar sesión para reportar');
                } else {
                  handleReportReviewButton(review);
                }
              }}
            >
              <FaFlag />
              <span>Reportar</span>
            </StyledFlex>
          )}
        </StyledFlex>
      </StyledFlexColumn>
    </StyledFlexColumn>
  );
};
