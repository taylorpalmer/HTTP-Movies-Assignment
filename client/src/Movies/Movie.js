import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  console.log(props);

  const deleteMovie = (event) => {
    event.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then((res) => {
        console.log("delete res: ", res);
        props.updateMovies((state) =>
          state.filter((movie) => movie.id != props.match.params.id)
        );
        props.history.push(`/`);
      });
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div>
        <button onClick={() => props.history.push(`/update-movie/${movie.id}`)}>
          Edit
        </button>
        <button onClick={deleteMovie}>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
