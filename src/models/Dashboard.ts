export interface DashboardGraphs {
  reviews: { [x: string]: number };
  new_profiles: {
    new_events: { [x: string]: number };
    new_artists: { [x: string]: number };
    new_venues: { [x: string]: number };
  };
  new_comments: { [x: string]: number };
  new_users: { [x: string]: number };
}

export interface DashboardTables {
  metrics: {
    videos: {
      today: number;
      days7: number;
      days30: number;
    };
    likes: {
      today: number;
      days7: number;
      days30: number;
    };
    events: {
      today: number;
      days7: number;
      days30: number;
    };
  };
  user_type: { [x: string]: number };
}
