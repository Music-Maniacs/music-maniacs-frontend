import axios from 'axios';
import { ReportCategory } from '../models/Report';

const videosUrl = `${process.env.REACT_APP_API_URL}/videos`;

export async function deleteVideo(videoId: string): Promise<void> {
  return (await axios.delete(`${videosUrl}/${videoId}`)).data;
}

export async function likeVideo(videoId: string): Promise<void> {
  return (await axios.post(`${videosUrl}/${videoId}/like`)).data;
}

export async function removeLikeVideo(videoId: string): Promise<void> {
  return (await axios.post(`${videosUrl}/${videoId}/remove_like`)).data;
}
export async function reportVideo(id: string, userComment: string, category: ReportCategory): Promise<void> {
  const requestBody = {
    report: {
      user_comment: userComment,
      category
    }
  };

  return (await axios.post(`${videosUrl}/${id}/report`, requestBody)).data;
}
