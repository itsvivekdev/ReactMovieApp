import React from 'react'

const Input = (props) => {
  return (
    <div className='input-content'>
        <input type="text" placeholder='search movie' onChange={props.onchange} value={props.val} />
        <button className='searchbtn' onClick={props.onclickhandler}>Search</button>
    </div>
  )
}

export default Input