
import { Link, useLocation } from 'react-router-dom';
import { Navbar as FlowbiteNavbar } from 'flowbite-react';
import React from 'react';

function Navbar() {
  const location = useLocation();
  
  return (
    <FlowbiteNavbar fluid className="bg-gray-800 border-gray-700 shadow-lg py-4">
      <FlowbiteNavbar.Brand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <span className="text-purple-500">Stream</span>Hub
        </span>
      </FlowbiteNavbar.Brand>
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link 
          as={Link} 
          to="/"
          className={`nav-link text-gray-300 hover:text-white ${location.pathname === '/' ? 'active-nav-link text-white' : ''}`}
        >
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link 
          as={Link} 
          to="/upload"
          className={`nav-link text-gray-300 hover:text-white ${location.pathname === '/upload' ? 'active-nav-link text-white' : ''}`}
        >
          Upload
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link 
          as={Link} 
          to="/videos"
          className={`nav-link text-gray-300 hover:text-white ${location.pathname === '/videos' ? 'active-nav-link text-white' : ''}`}
        >
          Video Library
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link 
          as={Link} 
          to="/music"
          className={`nav-link text-gray-300 hover:text-white ${location.pathname === '/music' ? 'active-nav-link text-white' : ''}`}
        >
          Music Library
        </FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

export default Navbar;