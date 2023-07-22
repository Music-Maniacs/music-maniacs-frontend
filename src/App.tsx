import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // ThemeProvider
    // AuthProvider
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<h1>Music Maniacs</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
