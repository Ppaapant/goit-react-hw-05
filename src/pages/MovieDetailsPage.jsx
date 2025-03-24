import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, NavLink, Outlet } from 'react-router-dom';  
import { getMovieDetails } from '../services/api'; 


const MovieDetailsPage = () => {
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId); 
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const { title, overview, release_date, vote_average, poster_path } = movie;

  
  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>

      <div>
        <img src={posterUrl} alt={title} />
        <div>
          <h1>{title}</h1>
          <p><strong>Release Date:</strong> {release_date}</p>
          <p><strong>Rating:</strong> {vote_average}</p>
          <p><strong>Overview:</strong> {overview}</p>
        </div>
      </div>

       <ul>
        <li>
            <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
            <NavLink to="review">Review</NavLink>
        </li>
       </ul>
       
       <Outlet/>

    </div>
  );
};

export default MovieDetailsPage;
