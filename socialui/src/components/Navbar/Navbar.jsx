import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem("user-token")
    navigate("/login")
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Logo</span>
      </div>
      <div className="topbarLinks">
        {isLoggedIn && <span className="topbarLink" onClick={handleLogOut}>Log Out</span>}
      </div>
    </div>
  )
}

export default Navbar
