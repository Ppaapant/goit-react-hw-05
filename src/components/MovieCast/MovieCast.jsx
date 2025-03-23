import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul className={styles.castList}>
        {cast.length > 0 ? (
          cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={styles.castItem}>
               (
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={name}
                  className={styles.castImage}
                />
              ) 
              <p className={styles.actorName}>{name}</p>
              <p className={styles.characterName}>{character}</p>
            </li>
          ))
        ) : (
          <p>No cast available</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;