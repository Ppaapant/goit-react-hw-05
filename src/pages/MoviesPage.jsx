import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { getMoviesByQuery } from '../services/api'; 
import MovieList from '../components/MovieList'; 


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const query = searchParams.get('query') || ''; 

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const data = await getMoviesByQuery(query); 
          setMovies(data.results); 
        } catch (err) {
          setError('Failed to fetch movies');
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [query]); 

  const handleSearch = (event) => {
    event.preventDefault();
    
    const form = event.target;
    const query = form.query.value;
    if (query) {
      setSearchParams({ query }); 
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for movies..."
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MoviesPage;
