import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetail/>}/>
      </Routes>
    
    </div>
  )
}

export default App