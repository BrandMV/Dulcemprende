import React from 'react'
import "./navbar.css"

const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
       <nav className="navbar">
           <div className="nav_icon" onClick={() => openSidebar()}>
               <i className="fas fa-bars"></i>
           </div>
           <div className="navbar__left">
               <a className="active_link" href="#">Bienvenido</a>

           </div>

       </nav>
    )
}

export default Navbar
