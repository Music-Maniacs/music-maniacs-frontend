import React, { RefObject } from 'react';
import { Review } from '../../models/Review';
import { Rating } from '@mui/material';
import { FaEdit, FaFlag } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { BiUserCircle } from 'react-icons/bi';
import styled from 'styled-components';
import colors from '../../styles/_colors.scss';
import { StyledFlex, StyledFlexColumn } from '../../styles/styledComponents';
import MMLink from '../MMLink/MMLink';

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

const StyledUserAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  return (
    <StyledFlexColumn
      ref={innerRef}
      $padding="3px 0px"
      $margin="3px 0px"
      $borderBottom={`1px solid ${colors.input_border}`}
    >
      <StyledUserInfoContainer>
        <StyledUserAvatarContainer>
          <BiUserCircle size={'2rem'} />
        </StyledUserAvatarContainer>

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
            <StyledFlex $cursor="pointer" onClick={() => handleReportReviewButton(review)}>
              <FaFlag />
              <span>Reportar</span>
            </StyledFlex>
          )}
        </StyledFlex>
      </StyledFlexColumn>
    </StyledFlexColumn>
  );
};
