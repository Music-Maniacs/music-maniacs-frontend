import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import styled from 'styled-components';
import colors from '../../styles/_colors.scss';
import { Comment } from '../../models/Comment';
import moment from 'moment';
import { StyledFlex, StyledFlexColumn } from '../../styles/styledComponents';
import { FaEdit } from 'react-icons/fa';

type CommentContentProps = {
  comment: Comment;
  canEdit?: boolean;
  handleEditCommentButton: (comment: Comment) => void;
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

export const CommentContent = ({ comment, canEdit = false, handleEditCommentButton }: CommentContentProps) => {
  const { body, user, created_at } = comment;

  return (
    <StyledFlexColumn
      $padding="3px 0px"
      $margin="3px 0px"
      $borderBottom={`1px solid ${colors.input_border}`}
      $gap="10px"
    >
      <StyledUserInfoContainer>
        <StyledUserAvatarContainer>
          <BiUserCircle size={'2rem'} />
        </StyledUserAvatarContainer>

        <StyledFlexColumn $gap="2px">
          <span>{user.full_name}</span>
          <small>{moment(created_at).fromNow()}</small>
        </StyledFlexColumn>
      </StyledUserInfoContainer>

      <StyledFlexColumn $gap="7px">
        <span>{body}</span>

        <StyledFlex>
          {canEdit && (
            <StyledFlex $cursor="pointer" onClick={() => handleEditCommentButton && handleEditCommentButton(comment)}>
              <FaEdit />
              <span>Editar</span>
            </StyledFlex>
          )}
        </StyledFlex>
      </StyledFlexColumn>
    </StyledFlexColumn>
  );
};
