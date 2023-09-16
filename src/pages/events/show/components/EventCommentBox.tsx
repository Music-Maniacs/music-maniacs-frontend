import React, { useState } from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { useParams } from 'react-router-dom';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Comment } from '../../../../models/Comment';
import MMLink from '../../../../components/MMLink/MMLink';
import { CommentContent } from '../../../../components/Comments/CommentContent';
import { CommentsSkeleton } from '../../../../components/Comments/CommentsSkeleton';
import { StyledFlex, StyledFlexColumn } from '../../../../styles/styledComponents';
import { useAuth } from '../../../../context/authContext';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { EventCommentForm } from './EventCommentForm';
import { Event } from '../../../../models/Event';

type Props = {
  event: Event;
};

export const EventCommentBox = ({ event }: Props) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment>();
  const { isModalOpen, openModal, closeModal } = useModal();

  const { pagination, setPagination } = usePagination<Comment>({
    url: `${process.env.REACT_APP_API_URL}/events/${id}/comments`,
    requestCallback: (comments) => indexRequestCallback(comments),
    perPage: 5
  });

  const hasMoreComments = comments.length < pagination.total;

  const indexRequestCallback = (comments: Comment[]) => {
    if (pagination.page === 1) {
      setComments(comments);
    } else {
      setComments((prevComments) => [...prevComments, ...comments]);
    }
  };

  const getMoreComments = () => {
    setPagination((prevPagination) => ({ ...prevPagination, isLoading: true, page: prevPagination.page + 1 }));
  };

  const updateCommentTable = (comment: Comment) => {
    if (!isFormEdit) {
      comments.unshift(comment);
    } else {
      const commentIndex = comments.findIndex((c) => c.id === comment.id);

      comments[commentIndex] = comment;
    }

    closeModal();
  };

  const handleCreateCommentButton = () => {
    setIsFormEdit(false);
    setCommentToEdit(undefined);
    openModal();
  };

  const handleEditCommentButton = (comment: Comment) => {
    setIsFormEdit(true);
    setCommentToEdit(comment);
    openModal();
  };

  return (
    <>
      <MMModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        title={`${isFormEdit ? 'Editar' : 'Agregar'} Comentario`}
      >
        <EventCommentForm
          eventId={event.id}
          isFormEdit={isFormEdit}
          commentToEdit={commentToEdit}
          closeModal={closeModal}
          successCallback={(comment) => updateCommentTable(comment)}
        />
      </MMModal>{' '}
      <MMBox className="show-boxes">
        <StyledFlex $justifyContent="space-between">
          <MMSubTitle content="Comentarios" />

          <MMButton onClick={handleCreateCommentButton}>Agregar Comentario</MMButton>
        </StyledFlex>

        <StyledFlexColumn $gap="10px">
          {pagination.isLoading && pagination.page === 1 ? (
            <CommentsSkeleton />
          ) : (
            comments.map((comment: Comment) => (
              <CommentContent
                key={comment.id}
                comment={comment}
                canEdit={user?.id === comment.user?.id}
                handleEditCommentButton={handleEditCommentButton}
              />
            ))
          )}

          {pagination.isLoading && pagination.page > 1 && <CommentsSkeleton />}

          {hasMoreComments && !pagination.isLoading && <MMLink onClick={getMoreComments} content="Ver más" to={'#'} />}
        </StyledFlexColumn>
      </MMBox>
    </>
  );
};
