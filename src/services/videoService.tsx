import axios from 'axios';

const videosUrl = `${process.env.REACT_APP_API_URL}/videos`;

export async function likeVideo(videoId: string): Promise<void> {
  return (await axios.post(`${videosUrl}/${videoId}/like`)).data;
}

export async function removeLikeVideo(videoId: string): Promise<void> {
  return (await axios.post(`${videosUrl}/${videoId}/remove_like`)).data;
}
