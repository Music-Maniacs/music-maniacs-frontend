import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface DashboardData {
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
  users_type: { [x: string]: number };
  visits: { [x: string]: number };
  reviews: { [x: string]: number };
  new_comments: { [x: string]: number };
  new_users: { [x: string]: number };
  new_events: { [x: string]: number };
}

type StoreProps = {
  dashboardData?: DashboardData;
  setDashboardData: Dispatch<SetStateAction<DashboardData | undefined>>;
};

const DashboardContext = createContext<StoreProps | null>(null);

export const DashboardProvider = ({ children }: Props) => {
  const URL = `${process.env.REACT_APP_API_URL}/metrics`;
  const [dashboardData, setDashboardData] = useState<DashboardData | undefined>({
    metrics: {
      videos: {
        today: 0,
        days7: 5,
        days30: 5
      },
      likes: {
        today: 0,
        days7: 8,
        days30: 8
      },
      events: {
        today: 0,
        days7: 16,
        days30: 16
      }
    },
    users_type: {
      admin: 4,
      user: 0,
      moderator: 1,
      guest: 0,
      'level 1': 0,
      'level 2': 0,
      level_3: 0
    },
    visits: {},
    reviews: {},
    new_comments: {
      '2023-10-16': 1
    },
    new_users: {},
    new_events: {}
  });

  const store = {
    dashboardData,
    setDashboardData
  };

  return <DashboardContext.Provider value={store}>{children}</DashboardContext.Provider>;
};

export const useDashboard = (): StoreProps => {
  return useContext(DashboardContext) as StoreProps;
};
