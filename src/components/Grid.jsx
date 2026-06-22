import React from 'react'
import Card from './Card';

const Grid = (props) => {
  return (
    <div className='card-grid'>
        {props.moviedata.map((movie)=>{
            return(
                <div  key={movie.id}>
                    <Card title={movie.title} image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} date={movie.release_date}
                    vote = {movie.vote_average}  id={movie.id} />
                    
                </div>
            )
        })}
    </div>
  )
}

export default Grid