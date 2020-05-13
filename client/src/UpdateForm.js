import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const UpdateForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const movieToUpdate = props.movies.find((movie) => {
      return `${movie.id}` === props.match.params.id;
    });

    console.log("movieToUpdate: ", movieToUpdate);

    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, props.match.params.id]);

  const changeHandler = (event) => {
    event.persist();

    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(``, movie)
      .then((res) => {
        console.log("res: ", res);
        props.updateMovie(res.data);
        props.history.push(``);
      })
      .catch((err) => console.log("Error is: ", err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
