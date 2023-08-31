import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
const RolesContainer = lazy(() => import('./pages/admin/roles/RolesContainer'));
const RoleShow = lazy(() => import('./pages/admin/roles/show/Show'));
const ArtistsContainer = lazy(() => import('./pages/admin/artists/ArtistsContainer'));
const ArtistShow = lazy(() => import('./pages/admin/artists/show/Show'));
const GenresContainer = lazy(() => import('./pages/admin/genres/GenresContainer'));

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
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
            <Route path="/admin/users" element={<UsersContainer />} />
            <Route path="/admin/users/:id" element={<UserShow />} />
            <Route path="/admin/roles" element={<RolesContainer />} />
            <Route path="/admin/roles/:id" element={<RoleShow />} />
            <Route path="/admin/artists" element={<ArtistsContainer />} />
            <Route path="/admin/artists/:id" element={<ArtistShow />} />
            <Route path="/admin/genres" element={<GenresContainer />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
