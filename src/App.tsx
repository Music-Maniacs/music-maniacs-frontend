import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import NavBar from './components/NavBar/NavBar';
import { Loader } from './components/Loader/Loader';

// Events module
const Home = lazy(() => import('./pages/events/home/Home'));
const EventsContainer = lazy(() => import('./pages/events/EventsContainer'));
const EventsShow = lazy(() => import('./pages/events/show/Show'));
const EventsReviews = lazy(() => import('./pages/events/reviews/Reviews'));
const EventsMultimedia = lazy(() => import('./pages/events/multimedia/Multimedia'));
const SearchEvents = lazy(() => import('./pages/events/search/SearchEvents'));

// Auth Module
const Login = lazy(() => import('./pages/auth/Login/Login'));
const Register = lazy(() => import('./pages/auth/Register/Register'));
const ChangePassword = lazy(() => import('./pages/auth/ChangePassword/ChangePassword'));
const RecoverPassword = lazy(() => import('./pages/auth/RecoverPassword/RecoverPassword'));

// Admin Module
const UsersContainer = lazy(() => import('./pages/admin/users/UsersContainer'));
const UserShow = lazy(() => import('./pages/admin/users/show/Show'));
const AdminEventsContainer = lazy(() => import('./pages/admin/events/EventsContainer'));
const AdminEventsShow = lazy(() => import('./pages/admin/events/show/Show'));
const RolesContainer = lazy(() => import('./pages/admin/roles/RolesContainer'));
const RoleShow = lazy(() => import('./pages/admin/roles/show/Show'));
const TrustLevelsContainer = lazy(() => import('./pages/admin/trustLevels/TrustLevelsContainer'));
const TrustLevelShow = lazy(() => import('./pages/admin/trustLevels/show/Show'));
const ArtistsContainer = lazy(() => import('./pages/admin/artists/ArtistsContainer'));
const AdminArtistShow = lazy(() => import('./pages/admin/artists/show/Show'));
const GenresContainer = lazy(() => import('./pages/admin/genres/GenresContainer'));
const VenuesContainer = lazy(() => import('./pages/admin/venues/VenuesContainer'));
const AdminVenueShow = lazy(() => import('./pages/admin/venues/show/Show'));
const ProducersContainer = lazy(() => import('./pages/admin/producers/ProducersContainer'));
const AdminProducersShow = lazy(() => import('./pages/admin/producers/show/Show'));
const ThresholdsContainer = lazy(() => import('./pages/admin/thresholds/ThresholdContainer'));

// Profiles Module
const ProfilesSearch = lazy(() => import('./pages/profiles/search/Search'));
const ArtistContainer = lazy(() => import('./pages/profiles/artist/ArtistProfileContainer'));
const ArtistShow = lazy(() => import('./pages/profiles/artist/show/Show'));
const ArtistReviews = lazy(() => import('./pages/profiles/artist/reviews/Reviews'));
const ProducerContainer = lazy(() => import('./pages/profiles/producer/ProducerProfileContainer'));
const ProducerShow = lazy(() => import('./pages/profiles/producer/show/Show'));
const ProducerReviews = lazy(() => import('./pages/profiles/producer/reviews/Reviews'));
const VenueContainer = lazy(() => import('./pages/profiles/venue/VenueProfileContainer'));
const VenueShow = lazy(() => import('./pages/profiles/venue/show/Show'));
const VenueReviews = lazy(() => import('./pages/profiles/venue/reviews/Reviews'));

// Moderation Module
const ModerationContainer = lazy(() => import('./pages/moderation/ModerationContainer'));
const ModerationIndex = lazy(() => import('./pages/moderation/index/Index'));
const ModerationShow = lazy(() => import('./pages/moderation/show/Show'));

function App() {
  return (
    <AppProviders>
      <NavBar />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Events Module */}
          <Route path="/" element={<Home />} />

          <Route path="/events" element={<EventsContainer />}>
            <Route index element={<SearchEvents />} />
            <Route path=":id" element={<EventsShow />} />
            <Route path=":id/reviews" element={<EventsReviews />} />
            <Route path=":id/multimedia" element={<EventsMultimedia />} />
          </Route>

          {/* Auth Module */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/recover-password" element={<RecoverPassword />} />

          {/* Admin Module */}
          <Route path="admin">
            <Route path="users">
              <Route index element={<UsersContainer />} />
              <Route path=":id" element={<UserShow />} />
            </Route>

            <Route path="events">
              <Route index element={<AdminEventsContainer />} />
              <Route path=":id" element={<AdminEventsShow />} />
            </Route>

            <Route path="venues">
              <Route index element={<VenuesContainer />} />
              <Route path=":id" element={<AdminVenueShow />} />
            </Route>

            <Route path="roles">
              <Route index element={<RolesContainer />} />
              <Route path=":id" element={<RoleShow />} />
            </Route>

            <Route path="trust_levels">
              <Route index element={<TrustLevelsContainer />} />
              <Route path=":id" element={<TrustLevelShow />} />
            </Route>

            <Route path="artists">
              <Route index element={<ArtistsContainer />} />
              <Route path=":id" element={<AdminArtistShow />} />
            </Route>

            <Route path="genres">
              <Route index element={<GenresContainer />} />
            </Route>

            <Route path="producers">
              <Route index element={<ProducersContainer />} />
              <Route path=":id" element={<AdminProducersShow />} />
            </Route>

            <Route path="thresholds">
              <Route index element={<ThresholdsContainer />} />
            </Route>
          </Route>

          {/* Profiles Module */}
          <Route path="/profiles">
            <Route index element={<ProfilesSearch />} />

            <Route path="artists/:id" element={<ArtistContainer />}>
              <Route index element={<ArtistShow />} />
              <Route path="reviews" element={<ArtistReviews />} />
            </Route>

            <Route path="producers/:id" element={<ProducerContainer />}>
              <Route index element={<ProducerShow />} />
              <Route path="reviews" element={<ProducerReviews />} />
            </Route>

            <Route path="venues/:id" element={<VenueContainer />}>
              <Route index element={<VenueShow />} />
              <Route path="reviews" element={<VenueReviews />} />
            </Route>
          </Route>

          {/* Moderation Module */}
          <Route path="/moderation" element={<ModerationContainer />}>
            <Route index element={<ModerationIndex />} />
            <Route path=":id" element={<ModerationShow />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<Navigate to={'/events'} />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
