import axios from 'axios';
import { Comment } from '../models/Comment';

const eventsUrl = `${process.env.REACT_APP_API_URL}/events`;
const commentsUrl = `${process.env.REACT_APP_API_URL}/comments`;

export async function createComment(eventId: string, body: string): Promise<Comment> {
  const requestBody = {
    comment: {
      body
    }
  };

  return (await axios.post(`${eventsUrl}/${eventId}/add_comment`, requestBody)).data;
}

export async function updateComment(id: string, body: string): Promise<Comment> {
  const requestBody = {
    comment: {
      body
    }
  };

  return (await axios.put(`${commentsUrl}/${id}`, requestBody)).data;
}