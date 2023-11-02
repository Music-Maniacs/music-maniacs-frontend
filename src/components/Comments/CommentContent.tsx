import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/_colors.scss';
import { Comment } from '../../models/Comment';
import moment from 'moment';
import { StyledFlex, StyledFlexColumn } from '../../styles/styledComponents';
import { FaEdit, FaThumbsUp } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import { warningSnackbar } from '../Snackbar/Snackbar';
import MMLink from '../MMLink/MMLink';
import { UserAvatar } from './UserAvatar';

type CommentContentProps = {
  comment: Comment;
  canEdit?: boolean;
  handleEditCommentButton: (comment: Comment) => void;
  handleLikeComment: (commentId: string, likedByCurrentUser: boolean) => void;
};

const StyledUserInfoContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const CommentContent = ({
  comment,
  canEdit = false,
  handleEditCommentButton,
  handleLikeComment
}: CommentContentProps) => {
  const { user: currentUser } = useAuth();
  const { body, user, created_at, anonymous } = comment;

  return (
    <StyledFlexColumn
      $padding="3px 0px"
      $margin="3px 0px"
      $borderBottom={`1px solid ${colors.input_border}`}
      $gap="10px"
    >
      <StyledUserInfoContainer>
        <UserAvatar anonymous={anonymous} profile_image_full_url={user?.profile_image_full_url} />

        <StyledFlexColumn $gap="2px">
          {anonymous ? <span>Usuario Eliminado</span> : <MMLink content={user?.full_name} to={`/user/${user?.id}`} />}

          <small>{moment(created_at).fromNow()}</small>
        </StyledFlexColumn>
      </StyledUserInfoContainer>

      <StyledFlexColumn $gap="7px">
        <span>{body}</span>

        <StyledFlex $gap="15px">
          {/* Like */}
          <StyledFlex
            $cursor="pointer"
            onClick={() => {
              if (!currentUser) {
                warningSnackbar('Debe iniciar sesión para dar like');
              } else {
                handleLikeComment(comment.id, comment.liked_by_current_user);
              }
            }}
            style={{ color: comment.liked_by_current_user ? 'var(--accent)' : 'var(--text_color)' }}
          >
            <FaThumbsUp />
            {comment.likes_count}
          </StyledFlex>

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
