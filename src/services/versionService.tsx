import axios from 'axios';

const versionsUrl = `${process.env.REACT_APP_API_URL}/versions`;

export async function reportVersions(id: string, userComment: string): Promise<void> {
  const requestBody = {
    report: {
      user_comment: userComment
    }
  };

  return (await axios.post(`${versionsUrl}/${id}/report`, requestBody)).data;
}
