import React, { useState } from 'react';
import { Venue } from '../../../models/Venue';
import { Producer } from '../../../models/Producer';
import { Artist } from '../../../models/Artist';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { useModal } from '../../../components/hooks/useModal';
import { Review } from '../../../models/Review';
import { usePagination } from '../../../components/searcher/usePagination';
import { useInfiniteScroll } from '../../../components/hooks/useInfiniteScroll';
import { MMModal } from '../../../components/Modal/MMModal';
import { ReviewForm } from '../../../components/forms/reviews/ReviewForm';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../components/breadrumb/Breadcrumb';
import { ProfileInfoBox } from './ProfileInfoBox';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlexColumn } from '../../../styles/styledComponents';
import { Rating } from '@mui/material';
import { ReviewContent } from '../../../components/Reviews/ReviewContent';
import { ReviewsSkeleton } from '../../../components/Reviews/ReviewsSkeleton';
import { Loader } from '../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';

type ProfileAllReviewsProps = {
  profile: Artist | Producer | Venue;
  reviewableKlass: 'artist' | 'venue' | 'producer';
};

export const ProfileAllReviews = ({ profile, reviewableKlass }: ProfileAllReviewsProps) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [reviewToEdit, setReviewToEdit] = useState<Review>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [reviews, setReviews] = useState<Review[]>([]);

  const { pagination, setPagination } = usePagination<Review>({
    url: `${process.env.REACT_APP_API_URL}/${reviewableKlass}s/${id}/reviews`,
    requestCallback: reviewsRequestCallback,
    isLoading: true
  });

  function reviewsRequestCallback(reviews: Review[]) {
    if (pagination.page === 1) {
      setReviews(reviews);
    } else {
      setReviews((prevState) => [...(prevState ?? []), ...reviews]);
    }
  }

  const { lastElementRef } = useInfiniteScroll({
    pagination,
    setPagination
  });

  const handleEditReviewButton = (review: Review) => {
    setReviewToEdit(review);
    openModal();
  };

  const updateReview = (review: Review) => {
    if (!reviews) return;

    const reviewIndex = reviews.findIndex((r) => r.id === review.id);

    reviews[reviewIndex] = review;

    closeModal();
  };

  const reviewFormNameProps = {
    [`${reviewableKlass}Name`]: profile.name
  };

  return (
    <>
      <MMModal closeModal={closeModal} isModalOpen={isModalOpen} title={'Editar Reseña'}>
        {profile && (
          <ReviewForm
            isFormEdit={true}
            reviewToEdit={reviewToEdit}
            {...reviewFormNameProps}
            closeModal={closeModal}
            successCallback={(review) => updateReview(review)}
          />
        )}
      </MMModal>

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container">
        {profile ? (
          <>
            <Breadcrumb
              items={[
                { label: 'Perfiles', to: '/profiles' },
                { label: profile.name, to: `/profiles/${reviewableKlass}s/${profile.id}` },
                { label: 'Reseñas' }
              ]}
            />

            <ProfileInfoBox profile={profile} hideActions />

            <MMBox className="show-boxes">
              <div className="reviews-box">
                <MMSubTitle content="Reseñas" />

                <h4>Puntuación General</h4>

                <StyledFlexColumn $gap="5px">
                  <span>{profile.name}</span>
                  <Rating name="artist-rating" value={profile.rating ? +profile.rating : 0} precision={0.5} readOnly />
                </StyledFlexColumn>

                {pagination.isLoading && pagination.page === 1 && <ReviewsSkeleton />}

                {reviews.map((review: Review, index) => (
                  <ReviewContent
                    key={review.id}
                    innerRef={reviews.length === index + 1 ? lastElementRef : undefined}
                    reviewableName={profile.name}
                    review={review}
                    canEdit={user?.id === review.user?.id}
                    handleEditReviewButton={handleEditReviewButton}
                  />
                ))}

                {pagination.isLoading && pagination.page > 1 && <ReviewsSkeleton />}
              </div>
            </MMBox>
          </>
        ) : (
          <Loader />
        )}
      </MMContainer>

      <Tooltip id="tooltip" place="top" />
    </>
  );
};
