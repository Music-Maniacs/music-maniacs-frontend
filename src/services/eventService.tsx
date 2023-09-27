import axios from 'axios';
import { Event } from '../models/Event';

const eventsUrl = `${process.env.REACT_APP_API_URL}/events`;
const adminEventsUrl = `${process.env.REACT_APP_API_URL}/admin/events`;

export async function getEvent(id: string): Promise<Event> {
  return (await axios.get(`${eventsUrl}/${id}`)).data;
}

export async function createEvent(
  name: string,
  datetime: string,
  description: string,
  artist_id: string,
  venue_id: string,
  producer_id: string,
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Event> {
  const formData = new FormData();

  const eventData = {
    name,
    datetime,
    description,
    artist_id,
    venue_id,
    producer_id,
    links_attributes
  };

  formData.append('event', JSON.stringify(eventData));
  image && formData.append('image', image);

  return (await axios.post(eventsUrl, formData)).data;
}

export async function updateEvent(
  id: string,
  name: string,
  datetime: string,
  description: string,
  artist_id: string,
  venue_id: string,
  producer_id: string,
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Event> {
  const formData = new FormData();

  const eventData = {
    name,
    datetime,
    description,
    artist_id,
    venue_id,
    producer_id,
    links_attributes
  };

  formData.append('event', JSON.stringify(eventData));
  image && formData.append('image', image);

  return (await axios.put(`${eventsUrl}/${id}`, formData)).data;
}

export async function followEvent(id: string) {
  return (await axios.post(`${eventsUrl}/${id}/follow`)).data;
}

export async function unfollowEvent(id: string) {
  return (await axios.post(`${eventsUrl}/${id}/unfollow`)).data;
}

export async function adminCreateEvent(
  name: string,
  datetime: string,
  description: string,
  artist_id: string,
  venue_id: string,
  producer_id: string,
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Event> {
  const formData = new FormData();

  const eventData = {
    name,
    datetime,
    description,
    artist_id,
    venue_id,
    producer_id,
    links_attributes
  };

  formData.append('event', JSON.stringify(eventData));
  image && formData.append('image', image);

  return (await axios.post(adminEventsUrl, formData)).data;
}

export async function adminGetEvent(id: string): Promise<Event> {
  return (await axios.get(`${adminEventsUrl}/${id}`)).data;
}

export async function adminDeleteEvent(id: string): Promise<void> {
  return await axios.delete(`${adminEventsUrl}/${id}`);
}

export async function adminUpdateEvent(
  id: string,
  name: string,
  datetime: string,
  description: string,
  artist_id: string,
  venue_id: string,
  producer_id: string,
  links_attributes: {
    title: string;
    url: string;
  }[],
  image?: File
): Promise<Event> {
  const formData = new FormData();

  const eventData = {
    name,
    datetime,
    description,
    artist_id,
    venue_id,
    producer_id,
    links_attributes
  };

  formData.append('event', JSON.stringify(eventData));
  image && formData.append('image', image);

  return (await axios.put(`${adminEventsUrl}/${id}`, formData)).data;
}
