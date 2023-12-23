import axios from 'axios';
import { Event } from '../models/Event';
import { Video } from '../models/Video';
import { UserLocation } from '../components/hooks/useUserLocation';
import { DiscoverEventsResponse } from '../pages/events/home/Home';
import { ReportCategory } from '../models/Report';

const eventsUrl = `${process.env.REACT_APP_API_URL}/events`;
const adminEventsUrl = `${process.env.REACT_APP_API_URL}/admin/events`;

export async function discoverEvents(userLocation: UserLocation): Promise<DiscoverEventsResponse> {
  return (
    await axios.get(
      `${eventsUrl}/discover?country=${userLocation.country}&province=${userLocation.province}&city=${userLocation.city}`
    )
  ).data;
}

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

export async function reportEvent(
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

  return (await axios.post(`${eventsUrl}/${id}/report`, requestBody)).data;
}

export async function getVideos(id: string, sort: 'recorded_at desc' | 'created_at desc'): Promise<Video[]> {
  return (await axios.get(`${eventsUrl}/${id}/videos?sort=${sort}`)).data;
}

export async function uploadVideo(id: string, name: string, signed_id: string, recorded_at?: string): Promise<Video> {
  const formData = new FormData();

  formData.append('name', name);

  // es opcional
  recorded_at && formData.append('recorded_at', recorded_at);

  formData.append('signed_id', signed_id);

  return (await axios.post(`${eventsUrl}/${id}/videos/add_video`, formData)).data;
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
