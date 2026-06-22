import React from 'react'
import Card from './Card'

const Movierow = (props) => {

  return (
    <div className='Home-page-cards container'>
        <h1>{props.title}<span>{props.spantxt}</span></h1>
        <div className="card-grid">

            {(props.movies || []).map((movie)=>{
                return <Card key={movie.id} title={movie.title} image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} date={movie.release_date}
                    vote = {movie.vote_average}  id={movie.id} />
            })}
        </div>
    </div>
  )
}

export default Movierow