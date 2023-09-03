import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import NavBar from './components/NavBar/NavBar';
import { Loader } from './components/Loader/Loader';

// Auth Module
const Login = lazy(() => import('./pages/auth/Login/Login'));
const Register = lazy(() => import('./pages/auth/Register/Register'));
const ChangePassword = lazy(() => import('./pages/auth/ChangePassword/ChangePassword'));
const RecoverPassword = lazy(() => import('./pages/auth/RecoverPassword/RecoverPassword'));

// Admin Module
const UsersContainer = lazy(() => import('./pages/admin/users/UsersContainer'));
const UserShow = lazy(() => import('./pages/admin/users/show/Show'));
const EventsContainer = lazy(() => import('./pages/admin/events/EventsContainer'));
const EventsShow = lazy(() => import('./pages/admin/events/show/Show'));
const RolesContainer = lazy(() => import('./pages/admin/roles/RolesContainer'));
const RoleShow = lazy(() => import('./pages/admin/roles/show/Show'));
const ArtistsContainer = lazy(() => import('./pages/admin/artists/ArtistsContainer'));
const ArtistShow = lazy(() => import('./pages/admin/artists/show/Show'));
const GenresContainer = lazy(() => import('./pages/admin/genres/GenresContainer'));
const VenuesContainer = lazy(() => import('./pages/admin/venues/VenuesContainer'));
const VenueShow = lazy(() => import('./pages/admin/venues/show/Show'));

function App() {
  return (
    <AppProviders>
      <NavBar />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Auth Module */}
          <Route path="/" element={<h1>Music Maniacs Home</h1>} />
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
              <Route index element={<EventsContainer />} />
              <Route path=":id" element={<EventsShow />} />
            </Route>

            <Route path="venues">
              <Route index element={<VenuesContainer />} />
              <Route path=":id" element={<VenueShow />} />
            </Route>

            <Route path="roles">
              <Route index element={<RolesContainer />} />
              <Route path=":id" element={<RoleShow />} />
            </Route>

            <Route path="artists">
              <Route index element={<ArtistsContainer />} />
              <Route path=":id" element={<ArtistShow />} />
            </Route>

            <Route path="genres">
              <Route index element={<GenresContainer />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
