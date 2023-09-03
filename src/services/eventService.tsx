import axios from 'axios';
import { Event } from '../models/Event';

const adminEventsUrl = `${process.env.REACT_APP_API_URL}/admin/events`;

// fixme: agregar atributos
export async function adminCreateEvent(image?: File): Promise<Event> {
  const formData = new FormData();

  const eventData = {};

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

// fixme: agregar atributos
export async function adminUpdateEvent(id: string, image?: File): Promise<Event> {
  const formData = new FormData();

  const eventData = {};

  formData.append('event', JSON.stringify(eventData));
  image && formData.append('image', image);

  return (await axios.put(`${adminEventsUrl}/${id}`, formData)).data;
}
