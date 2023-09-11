import React from 'react';
import { Review } from '../../models/Review';
import { Rating } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { BiUserCircle } from 'react-icons/bi';
import styled from 'styled-components';
import colors from '../../styles/_colors.scss';

type ReviewContentProps = {
  review: Review;
  reviewableName?: string;
  canEdit?: boolean;
  handleEditReviewButton?: (review: Review) => void;
  canDelete?: boolean;
  handleDeleteReviewButton?: (review: Review) => void;
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

const StyledFlex = styled.div<{
  $gap?: string;
  $padding?: string;
  $margin?: string;
  $borderBottom?: string;
  $cursor?: string;
}>`
  display: flex;
  gap: ${({ $gap }) => $gap ?? '5px'};
  padding: ${({ $padding }) => $padding ?? '0'};
  margin: ${({ $margin }) => $margin ?? '0'};
  border-bottom: ${({ $borderBottom }) => $borderBottom ?? 'none'};
  cursor: ${({ $cursor }) => $cursor ?? 'auto'};
`;

const StyledFlexColumn = styled(StyledFlex)`
  flex-direction: column;
`;

const StyledActionIcon = styled.div`
  cursor: pointer;
`;

export const ReviewContent = ({
  review,
  canEdit = false,
  handleEditReviewButton,
  canDelete = false,
  handleDeleteReviewButton,
  reviewableName
}: ReviewContentProps) => {
  const { created_at, description, rating, user } = review;

  return (
    <StyledFlexColumn $padding="3px 0px" $margin="3px 0px" $borderBottom={`1px solid ${colors.input_border}`}>
      <StyledUserInfoContainer>
        <StyledUserAvatarContainer>
          <BiUserCircle size={'2rem'} />
        </StyledUserAvatarContainer>

        <StyledFlexColumn $gap="2px">
          <span>{user.full_name}</span>
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
          {canEdit && (
            <StyledFlex $cursor="pointer" onClick={() => handleEditReviewButton && handleEditReviewButton(review)}>
              <FaEdit />
              <span>Editar</span>
            </StyledFlex>
          )}
        </StyledFlex>
      </StyledFlexColumn>
    </StyledFlexColumn>
  );
};
