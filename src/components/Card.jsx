import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
  return (
    <Link to={`/movie/${props.id}`}>
      <div className='card'>
    

        <img src={props.image} alt={props.title} />
        <div className="card-content">
           <h3>{props.title}</h3>
       
        <p>{props.date}</p>
        <p>{props.vote}</p>
        </div>
   
      </div>
    </Link>
  )
}

export default Card