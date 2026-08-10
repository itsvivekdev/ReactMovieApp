import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import HeroSection from './HeroSection';
import Movierow from './Movierow';
import Navbar from './Navbar';

const Home = () => {
  const [appdata, setappdata] = useState(() => {
    const saved = sessionStorage.getItem('search_results');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setinput] = useState(() => {
    return sessionStorage.getItem('search_input') || '';
  });

  const [loader, setloader] = useState(false);
  const [trendingmovies, settrendingmovies] = useState([]);
  const [popularmovies, setpopularmovies] = useState([]);
  const [topratedmovies, settopratedmovies] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function fetchdata(e) {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    setloader(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`
      );
      const data = await res.json();

      setappdata(data.results || []);

      sessionStorage.setItem('search_results', JSON.stringify(data.results || []));
      sessionStorage.setItem('search_input', input);
    } catch (error) {
      console.error(error);
    } finally {
      setloader(false);
    }
  }

  const handleLogoReset = () => {
    sessionStorage.removeItem('search_results');
    sessionStorage.removeItem('search_input');
    setappdata([]);
    setinput('');
  };

  async function fetchTrendingMovies() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );
      const data = await res.json();
      settrendingmovies(data.results || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchTopratedmovies() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      const data = await res.json();
      settopratedmovies(data.results || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchPopularMovies() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await res.json();
      setpopularmovies(data.results || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTrendingMovies();
    fetchPopularMovies();
    fetchTopratedmovies();
  }, []);

  return (
    <div>
      <form onSubmit={fetchdata}>
        <Navbar
          onchange={(e) => setinput(e.target.value)}
          value={input}
          data={fetchdata}
          onLogoClick={handleLogoReset}
        />
      </form>

      {loader ? (
        <h2 className='loading-txt'>
          Loading...
        </h2>
      ) : appdata.length === 0 ? (
        <>
          <HeroSection />
          <Movierow title={'Trending '} spantxt="This Week" movies={trendingmovies} />
          <Movierow title="Most " spantxt="Popular" movies={popularmovies} />
          <Movierow title="⭐Top" spantxt=" Rated" movies={topratedmovies} />
        </>
      ) : (
        <>
          <h2 style={{ padding: '2rem', color: 'rgba(124, 58, 237, 0.85)' }}>
            Search Results
          </h2>
          <Grid moviedata={appdata} />
        </>
      )}
    </div>
  );
};

export default Home;