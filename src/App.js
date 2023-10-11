import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

// firebase API : https://react-http-a9534-default-rtdb.firebaseio.com/movie.json

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchMoviesHandler = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://react-http-a9534-default-rtdb.firebaseio.com/movie.json'
  //     );
  //     if (!response.ok) {
  //       throw new Error('Something went wrong!');
  //     }
  //     const data = await response.json();
  //     console.log('data___', data);

  //     const newData = [];
  //     for (const key in data) {
  //       newData.push(data[key]);
  //     }
  //     console.log('newData___', newData);

  //     // const transformedMovies = data.results.map((movieData) => {
  //     //   return {
  //     //     id: movieData.episode_id,
  //     //     title: movieData.title,
  //     //     openingText: movieData.opening_crawl,
  //     //     releaseDate: movieData.release_date,
  //     //   };
  //     // });

  //     setMovies(newData);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://react-http-a9534-default-rtdb.firebaseio.com/movie.json'
      );
      console.log('response : ', response);

      if (response.statusText !== 'OK') {
        throw new Error('Something went wrong!');
      }

      const resData = response.data;
      console.log('resData : ', resData);

      const getMovies = [];
      for (const key in resData) {
        getMovies.push(resData[key]);
      }
      console.log('getMovies : ', getMovies);

      setMovies(getMovies);
      console.log('movies : ', movies);

      // if (!response.ok) {
      //   throw new Error('Something went wrong!');
      // }
      // const data = await response.json();
      // console.log('data___', data);

      // const newData = [];
      // for (const key in data) {
      //   newData.push(data[key]);
      // }
      // console.log('newData___', newData);

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });

      // setMovies(newData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    axios
      .post(
        'https://react-http-a9534-default-rtdb.firebaseio.com/movie.json',
        movie
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    // const response = await fetch(
    //   'https://react-http-a9534-default-rtdb.firebaseio.com/movie.json',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(movie),
    //   }
    // );
    // const json = await response.json();
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
