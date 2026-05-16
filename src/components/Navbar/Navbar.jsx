import "./Navbar.css";
import React, { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import SearchIcon from "../../assets/search_icon.svg";
import BellIcon from "../../assets/bell_icon.svg";
import ProfileImg from "../../assets/profile_img.png";
import DropdownIcon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";


const Navbar = () => {
  const navref = useRef();

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >=80){
        navref.current.classList.add('nav-dark')
      }
      else{
        navref.current.classList.remove('nav-dark')
      }
    })
  },[])
  return (
    <div ref={navref} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo img" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={SearchIcon} alt="search icon image" className="icons" />
        <p> Children</p>
        <img src={BellIcon} alt="bell icon image" className="icons" />
        <div className="navbar-profile">
          <img src={ProfileImg} alt="Profile image" className="profile" />
          <img src={DropdownIcon} alt="dropdown icon image" />
          <div className="dropdown">
            <p onClick={()=>{logout()}}> Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
