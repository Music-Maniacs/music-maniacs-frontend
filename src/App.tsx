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
const UsersIndex = lazy(() => import('./pages/admin/users/UsersIndex'));

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
            <Route path="/admin/users" element={<UsersIndex />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
