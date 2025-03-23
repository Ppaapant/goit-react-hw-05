import Navigation from "./components/Navigation/Navigation";
// import HomePage from './components/pages/HomePage'
// import MovieDetailsPage from './components/pages/MovieDetailsPage'
// import MoviesPage from './components/pages/MoviesPage'
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import './App.css'


function App() {
  const HomePage = lazy(() => import('./pages/HomePage'));
  const MoviesPage = lazy(() => import('./pages/MoviesPage'));
  const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
  const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
  const MovieReviews = lazy(() => import("./components/MovieReviews"));
  return (
    <>
    
    <Navigation />
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />}/>
            <Route path="review" element={<MovieReviews />}/>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      
    </>
  )
}

export default App
