import React, { createContext, useContext, useEffect, useState } from 'react';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { useAuth } from '../../../context/authContext';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Review } from '../../../models/Review';
import { User } from '../../../models/User';
import { Venue } from '../../../models/Venue';
import {
  Follow,
  getFollowedArtists,
  getFollowedEvents,
  getFollowedProducers,
  getFollowedVenues,
  getUserProfile
} from '../../../services/userProfileService';

type StoreProps = {
  userProfile: User | undefined;
  setUserProfile: React.Dispatch<React.SetStateAction<User | undefined>>;
  reviews: Review[] | undefined;
  setReviews: React.Dispatch<React.SetStateAction<Review[] | undefined>>;
};

// type Follows = {
//   events: Follow;
//   venues: Follow;
//   producers: Follow;
//   artists: Follow;
// };

const UserContext = createContext<StoreProps | null>(null);

type Props = {
  children: React.ReactNode;
};
export const UserProvider = ({ children }: Props) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>();
  // const [followed, setFollowed] = useState<Follows>();
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      if (!user) throw new Error();
      const response = await getUserProfile(user.id);
      setUserProfile(response.user);
      setReviews(response.reviews);
    } catch (error) {
      errorSnackbar('Error al obtener los datos del perfil');
    }
  };

  // const fetchFollows = () => {
  //   getFollowedArtists
  //   getFollowedEvents
  //   getFollowedProducers
  //   getFollowedVenues
  // }

  const store = {
    userProfile,
    setUserProfile,
    reviews,
    setReviews
  };

  return <UserContext.Provider value={store}> {children} </UserContext.Provider>;
};

export const useUser = (): StoreProps => {
  const userContext = useContext(UserContext) as StoreProps;
  if (!userContext) {
    throw new Error('Add UserProvider to CombineProviders.');
  } else {
    return userContext;
  }
};
