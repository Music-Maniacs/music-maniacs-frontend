import axios from 'axios';
import { Venue } from '../models/Venue';

const adminVenuesUrl = `${process.env.REACT_APP_API_URL}/admin/venues`;

export async function adminCreateVenue(
  name: string,
  description: string,
  location_attributes: {
    id: string;
    zip_code: string;
    street: string;
    department: string;
    locality: string;
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
    department: string;
    locality: string;
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
