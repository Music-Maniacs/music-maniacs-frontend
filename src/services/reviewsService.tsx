import axios from 'axios';
import { Review } from '../models/Review';
import { ReportCategory } from '../models/Report';

const eventsUrl = `${process.env.REACT_APP_API_URL}/events`;
const reviewsUrl = `${process.env.REACT_APP_API_URL}/reviews`;

export async function createReview(
  rating: number,
  description: string,
  eventId: string,
  reviewableKlass: 'artist' | 'venue' | 'producer'
): Promise<Review> {
  const body = {
    review: {
      rating,
      description
    }
  };

  return (await axios.post(`${eventsUrl}/${eventId}/add_review/${reviewableKlass}`, body)).data;
}

export async function updateReview(id: string, rating: number, description: string): Promise<Review> {
  const body = {
    review: {
      rating,
      description
    }
  };

  return (await axios.put(`${reviewsUrl}/${id}`, body)).data;
}

export async function reportReview(id: string, user_comment: string, category: ReportCategory): Promise<void> {
  const requestBody = {
    report: {
      user_comment,
      category
    }
  };

  return (await axios.post(`${reviewsUrl}/${id}/report`, requestBody)).data;
}
