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
import { likeComment, removeLikeComment, reportComment } from '../../../../services/commentService';
import { errorSnackbar, warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { ReportForm } from '../../../../components/forms/report/ReportForm';
import { NoData } from '../../../../components/NoData/NoData';
import { Policy } from '../../../../models/Policy';

type Props = {
  event: Event;
  commentsPolicies?: Policy;
};

export const EventCommentBox = ({ event, commentsPolicies }: Props) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [commentToReport, setCommentToReport] = useState<Comment>();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

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
    if (commentsPolicies?.create) {
      setIsFormEdit(false);
      setCommentToEdit(undefined);
      openModal();
    } else {
      warningSnackbar(
        'No tienes permisos para comentar. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  const handleEditCommentButton = (comment: Comment) => {
    setIsFormEdit(true);
    setCommentToEdit(comment);
    openModal();
  };

  const handleReportCommentButton = (comment: Comment) => {
    if (commentsPolicies?.report) {
      setCommentToReport(comment);
      openReportModal();
    } else {
      warningSnackbar(
        'No tienes permisos para reportar comentarios. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  const handleLikeComment = async (commentId: string, likedByCurrentUser: boolean) => {
    const likeService = likedByCurrentUser ? removeLikeComment : likeComment;

    try {
      await likeService(commentId);

      const commentsTmp = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked_by_current_user: !likedByCurrentUser,
            likes_count: likedByCurrentUser ? comment.likes_count - 1 : comment.likes_count + 1
          };
        }

        return comment;
      });

      setComments(commentsTmp);
    } catch (error) {
      errorSnackbar('Error al dar like al comentario. Contacte a Soporte.');
    }
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
      </MMModal>

      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={commentToReport?.id || ''}
          service={reportComment}
          closeModal={closeReportModal}
          reportTitleText="el comentario"
          reportableType="Comment"
        />
      </MMModal>

      <MMBox className="show-boxes">
        <StyledFlex $justifyContent="space-between">
          <MMSubTitle content="Comentarios" />

          <MMButton
            onClick={() => {
              if (user) {
                handleCreateCommentButton();
              } else {
                warningSnackbar('Debes iniciar sesión para comentar');
              }
            }}
          >
            Agregar Comentario
          </MMButton>
        </StyledFlex>

        <StyledFlexColumn $gap="10px">
          {pagination.isLoading && pagination.page === 1 ? (
            <CommentsSkeleton />
          ) : comments.length === 0 ? (
            <NoData message="No hay comentarios para mostrar" />
          ) : (
            comments.map((comment: Comment) => (
              <CommentContent
                key={comment.id}
                comment={comment}
                canEdit={user?.id === comment.user?.id}
                handleEditCommentButton={handleEditCommentButton}
                handleLikeComment={handleLikeComment}
                handleReportComment={handleReportCommentButton}
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
