import axios from 'axios';
import { ReportCategory } from '../models/Report';

const versionsUrl = `${process.env.REACT_APP_API_URL}/versions`;

export async function reportVersions(id: string, userComment: string, category: ReportCategory): Promise<void> {
  const requestBody = {
    report: {
      user_comment: userComment,
      category
    }
  };

  return (await axios.post(`${versionsUrl}/${id}/report`, requestBody)).data;
}
