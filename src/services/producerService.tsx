import axios from 'axios';
import { Producer } from '../models/Producer';
import { ReportCategory } from '../models/Report';

const producersUrl = `${process.env.REACT_APP_API_URL}/producers`;
const adminProducersUrl = `${process.env.REACT_APP_API_URL}/admin/producers`;

export async function getProducer(id: string): Promise<Producer> {
  return (await axios.get(`${producersUrl}/${id}`)).data;
}

export async function createProducer(
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Producer> {
  const formData = new FormData();

  const producerData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('producer', JSON.stringify(producerData));
  image && formData.append('image', image);

  return (await axios.post(producersUrl, formData)).data;
}

export async function updateProducer(
  id: string,
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Producer> {
  const formData = new FormData();

  const producerData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('producer', JSON.stringify(producerData));
  image && formData.append('image', image);

  return (await axios.put(`${producersUrl}/${id}`, formData)).data;
}

export async function reportProducer(
  id: string,
  userComment: string,
  category: ReportCategory,
  originalReportableId?: string
): Promise<void> {
  const requestBody = {
    report: {
      user_comment: userComment,
      category,
      original_reportable_id: originalReportableId
    }
  };

  return (await axios.post(`${producersUrl}/${id}/report`, requestBody)).data;
}

export async function followProducer(id: string) {
  return (await axios.post(`${producersUrl}/${id}/follow`)).data;
}

export async function unfollowProducer(id: string) {
  return (await axios.post(`${producersUrl}/${id}/unfollow`)).data;
}

export async function adminCreateProducer(
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Producer> {
  const formData = new FormData();

  const producerData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('producer', JSON.stringify(producerData));
  image && formData.append('image', image);

  return (await axios.post(adminProducersUrl, formData)).data;
}

export async function adminGetProducer(id: string): Promise<Producer> {
  return (await axios.get(`${adminProducersUrl}/${id}`)).data;
}

export async function adminDeleteProducer(id: string): Promise<void> {
  return await axios.delete(`${adminProducersUrl}/${id}`);
}

export async function adminUpdateProducer(
  id: string,
  name: string,
  nationality: string,
  description: string,
  genre_ids: string[],
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Producer> {
  const formData = new FormData();

  const producerData = {
    name,
    nationality,
    description,
    genre_ids,
    links_attributes
  };

  formData.append('producer', JSON.stringify(producerData));
  image && formData.append('image', image);

  return (await axios.put(`${adminProducersUrl}/${id}`, formData)).data;
}
