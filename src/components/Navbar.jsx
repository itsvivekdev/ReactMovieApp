import React from 'react'
import { useNavigate } from 'react-router-dom'
import Input from './Input'

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (props.onLogoClick) {
      props.onLogoClick(); 
    }
    navigate('/');
  }

  return (
    <div>
      <div className="nav">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <span>Noir</span>Flix
        </div>
        <Input onchange={props.onchange} val={props.value} onclickhandler={props.data} />
      </div>
    </div>
  )
}

export default Navbar;