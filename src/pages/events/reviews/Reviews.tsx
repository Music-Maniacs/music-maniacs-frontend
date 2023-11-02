import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/eventsContext';
import { MMModal } from '../../../components/Modal/MMModal';
import { useModal } from '../../../components/hooks/useModal';
import { Review } from '../../../models/Review';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../components/breadrumb/Breadcrumb';
import { EventInfoBox } from '../show/components/EventInfoBox';
import { Loader } from '../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../components/MMButton/MMButton';
import { Grid, Rating } from '@mui/material';
import { useAuth } from '../../../context/authContext';
import { Navtab } from '../../../components/Navtab/Navtab';
import { usePagination } from '../../../components/searcher/usePagination';
import { ReviewContent } from '../../../components/Reviews/ReviewContent';
import { useInfiniteScroll } from '../../../components/hooks/useInfiniteScroll';
import { Pagination } from '../../../models/Generic';
import { ReviewsSkeleton } from '../../../components/Reviews/ReviewsSkeleton';
import { ReportForm } from '../../../components/forms/report/ReportForm';
import { reportReview } from '../../../services/reviewsService';
import { NoData } from '../../../components/NoData/NoData';
import { ReviewForm } from '../../../components/forms/reviews/ReviewForm';

const Reviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [reviewToEdit, setReviewToEdit] = useState<Review>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { showEvent, setShowEvent, getShowEvent } = useEvents();
  const [reviewToReport, setReviewToReport] = useState<Review>();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  const [artistReviews, setArtistReviews] = useState<Review[]>([]);
  const [venueReviews, setVenueReviews] = useState<Review[]>([]);
  const [producerReviews, setProducerReviews] = useState<Review[]>([]);

  const { pagination: artistPagination, setPagination: setArtistPagination } = usePagination<Review>({
    url: `${process.env.REACT_APP_API_URL}/events/${showEvent?.id}/reviews`,
    requestCallback: (reviews) => reviewsRequestCallback(reviews, setArtistReviews, artistPagination),
    optionalParam: 'reviewable_klass=artist',
    isLoading: false
  });

  const { pagination: venuePagination, setPagination: setVenuePagination } = usePagination<Review>({
    url: `${process.env.REACT_APP_API_URL}/events/${showEvent?.id}/reviews`,
    requestCallback: (reviews) => reviewsRequestCallback(reviews, setVenueReviews, venuePagination),
    optionalParam: 'reviewable_klass=venue',
    isLoading: false
  });

  const { pagination: producerPagination, setPagination: setProducerPagination } = usePagination<Review>({
    url: `${process.env.REACT_APP_API_URL}/events/${showEvent?.id}/reviews`,
    requestCallback: (reviews) => reviewsRequestCallback(reviews, setProducerReviews, producerPagination),
    optionalParam: 'reviewable_klass=producer',
    isLoading: false
  });

  function reviewsRequestCallback(
    reviews: Review[],
    setReviews: Dispatch<SetStateAction<Review[]>>,
    pagination: Pagination
  ) {
    if (pagination.page === 1) {
      setReviews(reviews);
    } else {
      setReviews((prevState) => [...(prevState ?? []), ...reviews]);
    }
  }

  const { lastElementRef: artistLastElementRef } = useInfiniteScroll({
    pagination: artistPagination,
    setPagination: setArtistPagination
  });

  const { lastElementRef: producerLastElementRef } = useInfiniteScroll({
    pagination: producerPagination,
    setPagination: setProducerPagination
  });

  const { lastElementRef: venueLastElementRef } = useInfiniteScroll({
    pagination: venuePagination,
    setPagination: setVenuePagination
  });

  useEffect(() => {
    if (!id) return navigate('/events');

    if (!showEvent || showEvent.id !== id) getShowEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showEvent) {
      artistReviews.length === 0 && setArtistPagination((prevState) => ({ ...prevState, isLoading: true }));
      venueReviews.length === 0 && setVenuePagination((prevState) => ({ ...prevState, isLoading: true }));
      producerReviews.length === 0 && setProducerPagination((prevState) => ({ ...prevState, isLoading: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEvent]);

  const handleCreateReviewButton = () => {
    setIsFormEdit(false);
    setReviewToEdit(undefined);
    openModal();
  };

  const handleEditReviewButton = (review: Review) => {
    setIsFormEdit(true);
    setReviewToEdit(review);
    openModal();
  };

  const handleReportReviewButton = (review: Review) => {
    setReviewToReport(review);
    openReportModal();
  };

  const reviewsByReviewable = {
    artist: artistReviews,
    producer: producerReviews,
    venue: venueReviews
  };

  const setReviewsByReviewable = {
    artist: setArtistReviews,
    producer: setProducerReviews,
    venue: setVenueReviews
  };

  const updateReview = (review: Review) => {
    const reviewableType = review.reviewable_type.toLowerCase() as 'artist' | 'venue' | 'producer';

    const reviews: Review[] = reviewsByReviewable[reviewableType];
    const setReviews = setReviewsByReviewable[reviewableType];

    if (isFormEdit) {
      const index = reviews.findIndex((r) => r.id === review.id);

      reviews[index] = review;
      setReviews(reviews);
    } else {
      setReviews([review, ...reviews]);
    }

    closeModal();
  };

  return (
    <>
      <MMModal closeModal={closeModal} isModalOpen={isModalOpen} title={`${isFormEdit ? 'Editar' : 'Agregar'} Reseña`}>
        {showEvent && (
          <ReviewForm
            eventId={showEvent.id}
            isFormEdit={isFormEdit}
            reviewToEdit={reviewToEdit}
            artistName={showEvent.artist.name}
            producerName={showEvent.producer.name}
            venueName={showEvent.venue.name}
            closeModal={closeModal}
            successCallback={(review) => updateReview(review)}
          />
        )}
      </MMModal>

      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={reviewToReport?.id || ''}
          service={reportReview}
          closeModal={closeReportModal}
          reportTitleText="la reseña"
          reportableType="Review"
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="events-show-boxes-container ">
        {showEvent ? (
          <>
            <Breadcrumb
              items={[
                { label: 'Eventos', to: '/events' },
                { label: showEvent.name, to: `/events/${showEvent.id}` },
                { label: 'Reseñas' }
              ]}
            />

            <EventInfoBox event={showEvent} openModal={openModal} setEvent={setShowEvent} hideActions />

            <MMBox className="show-boxes ">
              <div className="reviews-box">
                <div className="title-container">
                  <MMSubTitle content="Reseñas" />

                  <MMButton onClick={handleCreateReviewButton}>Agregar Reseña</MMButton>
                </div>

                <h4>Puntuación General</h4>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} display={'flex'} flexDirection={'column'} gap={'5px'}>
                    <span>{`${showEvent.artist.name} (${showEvent.reviews_info?.artist.reviews_count})`}</span>
                    <Rating
                      name="artist-rating"
                      value={showEvent.reviews_info?.artist.rating ? +showEvent.reviews_info.artist.rating : 0}
                      precision={0.5}
                      readOnly
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} display={'flex'} flexDirection={'column'} gap={'5px'}>
                    <span>{`${showEvent.venue.name} (${showEvent.reviews_info?.venue.reviews_count})`}</span>
                    <Rating
                      name="venue-rating"
                      value={showEvent.reviews_info?.venue.rating ? +showEvent.reviews_info.venue.rating : 0}
                      precision={0.5}
                      readOnly
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} display={'flex'} flexDirection={'column'} gap={'5px'}>
                    <span>{`${showEvent.producer.name} (${showEvent.reviews_info?.producer.reviews_count})`}</span>
                    <Rating
                      name="producer-rating"
                      value={showEvent.reviews_info?.producer.rating ? +showEvent.reviews_info.producer.rating : 0}
                      precision={0.5}
                      readOnly
                    />
                  </Grid>
                </Grid>

                <h4>Reseñas</h4>

                <Navtab
                  items={[
                    {
                      label: 'Artista',
                      content: () => (
                        <ReviewsByReviewable
                          pagination={artistPagination}
                          reviews={artistReviews}
                          handleEditReviewButton={handleEditReviewButton}
                          handleReportReviewButton={handleReportReviewButton}
                          reviewableName={showEvent.artist.name}
                          lastElementRef={artistLastElementRef}
                        />
                      )
                    },
                    {
                      label: 'Espacio de Evento',
                      content: () => (
                        <ReviewsByReviewable
                          pagination={venuePagination}
                          reviews={venueReviews}
                          handleEditReviewButton={handleEditReviewButton}
                          handleReportReviewButton={handleReportReviewButton}
                          reviewableName={showEvent.venue.name}
                          lastElementRef={venueLastElementRef}
                        />
                      )
                    },
                    {
                      label: 'Productora',
                      content: () => (
                        <ReviewsByReviewable
                          pagination={producerPagination}
                          reviews={producerReviews}
                          handleEditReviewButton={handleEditReviewButton}
                          handleReportReviewButton={handleReportReviewButton}
                          reviewableName={showEvent.producer.name}
                          lastElementRef={producerLastElementRef}
                        />
                      )
                    }
                  ]}
                />
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

export default Reviews;

type ReviewByReviewableProps = {
  pagination: Pagination;
  handleEditReviewButton: (review: Review) => void;
  handleReportReviewButton: (review: Review) => void;
  reviews: Review[];
  reviewableName: string;
  lastElementRef: (node: HTMLDivElement) => void;
};

const ReviewsByReviewable = ({
  pagination,
  handleEditReviewButton,
  handleReportReviewButton,
  reviews,
  reviewableName,
  lastElementRef
}: ReviewByReviewableProps) => {
  const { user } = useAuth();

  return (
    <>
      {pagination.isLoading && pagination.page === 1 && <ReviewsSkeleton />}

      {reviews.length === 0 ? (
        <NoData message="No hay reseñas para mostrar" />
      ) : (
        reviews.map((review: Review, index) => (
          <ReviewContent
            key={review.id}
            innerRef={reviews.length === index + 1 ? lastElementRef : undefined}
            reviewableName={reviewableName}
            review={review}
            canEdit={user?.id === review?.user?.id}
            handleEditReviewButton={handleEditReviewButton}
            handleReportReviewButton={handleReportReviewButton}
          />
        ))
      )}

      {pagination.isLoading && pagination.page > 1 && <ReviewsSkeleton />}
    </>
  );
};
