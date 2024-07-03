import React from 'react';
import { Link } from 'react-scroll';
import './navbar.css';  // Import your CSS for the Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="home" smooth={true} duration={500} className="navbar-link" aria-label="Go to Home">Home</Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500} className="navbar-link" aria-label="Go to About Us">About Us</Link>
        </li>
        <li>
          <Link to="courses" smooth={true} duration={500} className="navbar-link" aria-label="Go to Courses">Courses</Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500} className="navbar-link" aria-label="Go to Contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
