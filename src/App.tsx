import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import NavBar from './components/NavBar/NavBar';
import { Loader } from './components/Loader/Loader';

// Events module
const EventsContainer = lazy(() => import('./pages/events/EventsContainer'));
const EventsShow = lazy(() => import('./pages/events/show/Show'));
const EventsReviews = lazy(() => import('./pages/events/reviews/Reviews'));
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
const ArtistShow = lazy(() => import('./pages/admin/artists/show/Show'));
const GenresContainer = lazy(() => import('./pages/admin/genres/GenresContainer'));
const VenuesContainer = lazy(() => import('./pages/admin/venues/VenuesContainer'));
const VenueShow = lazy(() => import('./pages/admin/venues/show/Show'));
const ProducersContainer = lazy(() => import('./pages/admin/producers/ProducersContainer'));
const ProducersShow = lazy(() => import('./pages/admin/producers/show/Show'));
const ThresholdsContainer = lazy(() => import('./pages/admin/thresholds/ThresholdContainer'));

// User Profile Module
const UserProfileContainer = lazy(() => import('./pages/userProfile/UserProfileContainer'));

function App() {
  return (
    <AppProviders>
      <NavBar />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Events Module */}
          {/* todo: Temporal. Hasta que tengamos la vista de descubrir eventos */}
          <Route path="/" element={<Navigate to={'/events'} />} />

          <Route path="/events" element={<EventsContainer />}>
            <Route index element={<SearchEvents />} />
            <Route path=":id/reviews" element={<EventsReviews />} />
            <Route path=":id" element={<EventsShow />} />
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
              <Route path=":id" element={<VenueShow />} />
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
              <Route path=":id" element={<ArtistShow />} />
            </Route>

            <Route path="genres">
              <Route index element={<GenresContainer />} />
            </Route>

            <Route path="producers">
              <Route index element={<ProducersContainer />} />
              <Route path=":id" element={<ProducersShow />} />
            </Route>

            <Route path="thresholds">
              <Route index element={<ThresholdsContainer />} />
            </Route>
          </Route>

          {/* User Profile Module */}
          <Route path="/user/profile">
            <Route index element={<UserProfileContainer />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<Navigate to={'/events'} />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
