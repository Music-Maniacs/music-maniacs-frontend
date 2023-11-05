import axios from 'axios';
import { Venue } from '../models/Venue';
import { ReportCategory } from '../models/Report';

const venuesUrl = `${process.env.REACT_APP_API_URL}/venues`;
const adminVenuesUrl = `${process.env.REACT_APP_API_URL}/admin/venues`;

export async function getVenue(id: string): Promise<Venue> {
  return (await axios.get(`${venuesUrl}/${id}`)).data;
}

export async function createVenue(
  name: string,
  description: string,
  location_attributes: {
    id: string;
    zip_code: string;
    street: string;
    city: string;
    latitude: string;
    longitude: string;
    number: number;
    country: string;
    province: string;
  },
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Venue> {
  const formData = new FormData();

  const venueData = {
    name,
    description,
    location_attributes,
    links_attributes
  };

  formData.append('venue', JSON.stringify(venueData));
  image && formData.append('image', image);

  return (await axios.post(venuesUrl, formData)).data;
}

export async function updateVenue(
  id: string,
  name: string,
  description: string,
  location_attributes: {
    id: string;
    zip_code: string;
    street: string;
    city: string;
    latitude: string;
    longitude: string;
    number: number;
    country: string;
    province: string;
  },
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Venue> {
  const formData = new FormData();

  const venueData = {
    name,
    description,
    location_attributes,
    links_attributes
  };

  formData.append('venue', JSON.stringify(venueData));
  image && formData.append('image', image);

  return (await axios.put(`${venuesUrl}/${id}`, formData)).data;
}

export async function reportVenue(
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

  return (await axios.post(`${venuesUrl}/${id}/report`, requestBody)).data;
}

export async function followVenue(id: string) {
  return (await axios.post(`${venuesUrl}/${id}/follow`)).data;
}

export async function unfollowVenue(id: string) {
  return (await axios.post(`${venuesUrl}/${id}/unfollow`)).data;
}

export async function adminCreateVenue(
  name: string,
  description: string,
  location_attributes: {
    id: string;
    zip_code: string;
    street: string;
    city: string;
    latitude: string;
    longitude: string;
    number: number;
    country: string;
    province: string;
  },
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Venue> {
  const formData = new FormData();

  const venueData = {
    name,
    description,
    location_attributes,
    links_attributes
  };

  formData.append('venue', JSON.stringify(venueData));
  image && formData.append('image', image);

  return (await axios.post(adminVenuesUrl, formData)).data;
}

export async function adminGetVenue(id: string): Promise<Venue> {
  return (await axios.get(`${adminVenuesUrl}/${id}`)).data;
}

export async function adminDeleteVenue(id: string): Promise<void> {
  return await axios.delete(`${adminVenuesUrl}/${id}`);
}

export async function adminUpdateVenue(
  id: string,
  name: string,
  description: string,
  location_attributes: {
    id: string;
    zip_code: string;
    street: string;
    city: string;
    latitude: string;
    longitude: string;
    number: number;
    country: string;
    province: string;
  },
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Venue> {
  const formData = new FormData();

  const venueData = {
    name,
    description,
    location_attributes,
    links_attributes
  };

  formData.append('venue', JSON.stringify(venueData));
  image && formData.append('image', image);

  return (await axios.put(`${adminVenuesUrl}/${id}`, formData)).data;
}
