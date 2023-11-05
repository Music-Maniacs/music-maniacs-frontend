import axios from 'axios';
import { Comment } from '../models/Comment';
import { ReportCategory } from '../models/Report';

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

export async function likeComment(commentId: string): Promise<void> {
  return (await axios.post(`${commentsUrl}/${commentId}/like`)).data;
}

export async function removeLikeComment(commentId: string): Promise<void> {
  return (await axios.post(`${commentsUrl}/${commentId}/remove_like`)).data;
}

export async function reportComment(commentId: string, user_comment: string, category: ReportCategory): Promise<void> {
  const requestBody = {
    report: {
      user_comment,
      category
    }
  };

  return (await axios.post(`${commentsUrl}/${commentId}/report`, requestBody)).data;
}
