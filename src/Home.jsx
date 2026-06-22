import React, { useEffect, useState } from 'react'
import Input from './components/Input';
import Grid from './components/Grid';
import HeroSection from './HeroSection';
import Movierow from './components/Movierow';



const Home = () => {
  const [appdata, setappdata] = useState([])
  const [input, setinput] = useState('');
  const [loader, setloader] = useState(false);
  const [error, seterror] = useState(false);
  const [trandingmovies, settrandingmovies] = useState([])
  const [popularmovies, setpopularmovies] = useState([])
  const [topratedmovies, settopratedmovies] = useState([])

  const API_KEY = import.meta.env.VITE_API_KEY;
  



async function fetchdata() {
  if (!input.trim()) return; 
  setloader(true);
  seterror(false);
  try {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`);
const data = await res.json();


    setappdata(data.results);
  }
   catch (error) {
    seterror(true);
  } finally {
    setloader(false);
  }
}


async function fetchTrandingMovies() {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    const data = await res.json()
    settrandingmovies(data.results)

  }catch(err){
    seterror(err)
  }
  
}

async function fetchTopratedmovies() {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
    const data = await res.json()
    settopratedmovies(data.results)

  }catch(err){
    seterror(err)
  }
  
}
async function fetchPopularMovies() {
  try{
    const res = await fetch(  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    const data = await res.json()
    setpopularmovies(data.results)

  }catch(err){
    seterror(err)
  }
  
}
useEffect(() => {
fetchTrandingMovies();
fetchPopularMovies();
fetchTopratedmovies();
}, [])



 
  

  return (
    <div>
      <div className="nav">
        <div className="logo">Noir<span>Flix</span></div>
<Input onchange={(e)=>setinput(e.target.value)} val={input} onclickhandler={fetchdata} />
      </div>
      {
        loader ? (
  <h2 style={{ padding: '2rem', color: '#c084fc' }}>Loading...</h2>
):
      
      appdata.length ===0 ?(
        <>
        <HeroSection/>
        <Movierow title={'Trending '} spantxt='This Week'  movies={trandingmovies}/>
        <Movierow title='Most ' spantxt='Popular' movies={popularmovies}/>
        <Movierow title='⭐Top'spantxt=' Rated' movies={topratedmovies}/>

        </>
      ):(<>
        <h2  style={{ padding: '2rem', color: 'rgba(124, 58, 237, 0.85)' }}>Search Results</h2>
        
      <Grid moviedata={appdata}/></>)
}
    </div>
  )
 }

export default Home