import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Event } from '../../../../models/Event';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { Grid, Rating, Tab, Tabs } from '@mui/material';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { Review } from '../../../../models/Review';
import { EventReviewForm } from './EventReviewForm';
import { ReviewContent } from '../../../../components/ReviewContent/ReviewContent';
import { useAuth } from '../../../../context/authContext';

type Props = {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event | undefined>>;
};

export const EventReviewBox = ({ event, setEvent }: Props) => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState<'artist' | 'venue' | 'producer'>('artist');
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [reviewToEdit, setReviewToEdit] = useState<Review>();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleTabChange = (_event: SyntheticEvent, newValue: 'artist' | 'venue' | 'producer') => {
    setTabValue(newValue);
  };

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

  const updateReview = (review: Review) => {
    if (!event || !event.reviews_info) return;

    const reviewable_type = review.reviewable_type.toLowerCase() as 'artist' | 'venue' | 'producer';

    const last_reviewes_by_reviewable = event.reviews_info?.[reviewable_type].last_reviews ?? [];

    if (!isFormEdit) {
      last_reviewes_by_reviewable.unshift(review);
    } else {
      const reviewIndex = last_reviewes_by_reviewable.findIndex((r) => r.id === review.id);

      last_reviewes_by_reviewable[reviewIndex] = review;
    }

    closeModal();
  };

  return (
    <>
      <MMModal closeModal={closeModal} isModalOpen={isModalOpen} title={`${isFormEdit ? 'Editar' : 'Agregar'} Reseña`}>
        <EventReviewForm
          eventId={event.id}
          isFormEdit={isFormEdit}
          reviewToEdit={reviewToEdit}
          artistName={event.artist.name}
          producerName={event.producer.name}
          venueName={event.venue.name}
          closeModal={closeModal}
          successCallback={(review) => updateReview(review)}
        />
      </MMModal>

      <MMBox className="show-boxes ">
        <div className="reviews-box">
          <div className="title-container">
            <MMSubTitle content="Reseñas" />

            <MMButton onClick={handleCreateReviewButton}>Agregar Reseña</MMButton>
          </div>

          <h4>Puntuación General</h4>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} display={'flex'} flexDirection={'column'} gap={'5px'}>
              <span>{`${event.artist.name} (${event.reviews_info?.artist.reviews_count})`}</span>
              <Rating
                name="artist-rating"
                value={event.reviews_info?.artist.rating ? +event.reviews_info.artist.rating : 0}
                precision={0.5}
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={4} display={'flex'} flexDirection={'column'} gap={'5px'}>
              <span>{`${event.venue.name} (${event.reviews_info?.venue.reviews_count})`}</span>
              <Rating
                name="venue-rating"
                value={event.reviews_info?.venue.rating ? +event.reviews_info.venue.rating : 0}
                precision={0.5}
                readOnly
              />
            </Grid>

            <Grid item xs={12} sm={4} display={'flex'} flexDirection={'column'} gap={'5px'}>
              <span>{`${event.producer.name} (${event.reviews_info?.producer.reviews_count})`}</span>
              <Rating
                name="producer-rating"
                value={event.reviews_info?.producer.rating ? +event.reviews_info.producer.rating : 0}
                precision={0.5}
                readOnly
              />
            </Grid>
          </Grid>

          <h4>Últimas Reseñas</h4>

          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value="artist" label="Artista" />
            <Tab value="venue" label="Espacio de Evento" />
            <Tab value="producer" label="Productora" />
          </Tabs>

          <TabContentContainer index={tabValue} value="artist">
            {event.reviews_info &&
              event.reviews_info.artist.last_reviews.map((review: Review) => (
                <ReviewContent
                  key={review.id}
                  reviewableName={event.artist.name}
                  review={review}
                  canEdit={user?.id === review.user.id}
                  handleEditReviewButton={handleEditReviewButton}
                />
              ))}
          </TabContentContainer>

          <TabContentContainer index={tabValue} value="venue">
            {event.reviews_info &&
              event.reviews_info.venue.last_reviews.map((review: Review) => (
                <ReviewContent
                  key={review.id}
                  reviewableName={event.venue.name}
                  review={review}
                  canEdit={user?.id === review.user.id}
                  handleEditReviewButton={handleEditReviewButton}
                />
              ))}
          </TabContentContainer>

          <TabContentContainer index={tabValue} value="producer">
            {event.reviews_info &&
              event.reviews_info.producer.last_reviews.map((review: Review) => (
                <ReviewContent
                  key={review.id}
                  reviewableName={event.producer.name}
                  review={review}
                  canEdit={user?.id === review.user.id}
                  handleEditReviewButton={handleEditReviewButton}
                />
              ))}
          </TabContentContainer>
        </div>
      </MMBox>
    </>
  );
};

interface TabContenyProps {
  children?: React.ReactNode;
  index: 'artist' | 'venue' | 'producer';
  value: 'artist' | 'venue' | 'producer';
}

const TabContentContainer = ({ children, index, value }: TabContenyProps) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <div>{children}</div>}
    </div>
  );
};
