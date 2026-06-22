  import React, { useEffect, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'

  const MovieDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setmovie] = useState(null);   
    const [cast, setcast] = useState([])
    const [movietrailer, setmovietrailer] = useState(null)

    const API_KEY =import.meta.env.VITE_API_KEY;

    async function fetchMovieDetail() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );

        const data = await res.json();



        setmovie(data);

      } catch (error) {
        console.log(error);
      }
    }

    async function fetchMovieCast() {
      try{
        const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await res.json();
    setcast(data.cast);

      }catch(err){
        console.log(err)
      }
      
    }

    async function fetchMovieTrailer() {

    try {

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );

      const data = await res.json();

    

      const trailerData = data.results.find(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube"
      );

      setmovietrailer(trailerData);

    } catch (error) {

      console.log(error);

    }
  }

    useEffect(() => {
      fetchMovieDetail();
      fetchMovieCast();
      fetchMovieTrailer();
    }, []);

    if (!movie) {
      return <h1  style={{ padding: '2rem', color: '#c084fc' }}>Loading...</h1>
    }

    return (
      <div>
        <div
    className="backdrop"
    style={{
      backgroundImage:
        `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
    }}
  >

    <div className="detail-container">

      <div className="poster-section">

        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

      </div>

      <div className="info-section">
        <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

        <h1>{movie.title}</h1>

        <p className='tagline'>
          {movie.tagline}
        </p>

        <div className="genres">

          {movie.genres.map((genre) => (
            <span key={genre.id}>
              {genre.name}
            </span>
          ))}

        </div>

        <div className="movie-meta">

          <p>
            <strong>Release:</strong>
            {movie.release_date}
          </p>

          <p>
            <strong>Runtime:</strong>
            {movie.runtime} min
          </p>

          <p>
            <strong>Rating:</strong>
            ⭐ {movie.vote_average}
          </p>

        </div>
        {
    movietrailer && (

      <a
        href={`https://www.youtube.com/watch?v=${movietrailer.key}`}
        target="_blank"
      >

        <button className='trailer-btn'>
          WATCH TRAILER
        </button>

      </a>

    )
  }

        <h3>Overview</h3>

        <p>{movie.overview}</p>

        <h3 className='cast-heading'>Top Cast</h3>

  <div className="cast-container">

    {cast.slice(0, 10).map((actor) => (

      <div className="cast-card" key={actor.id}>

        <img
          src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
          alt={actor.name}
        />

        <p>{actor.name}</p>

      </div>

    ))}

  </div>




      </div>
      
    </div>

  </div>

      
  </div>




        

      
        


    )
  }

  export default MovieDetail