import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Button } from 'flowbite-react';
import VideoLibrary from './components/VideoLibrary';
import VideoUpload from './components/VideoUpload';
import AudioLibrary from './components/AudioLibrary';
import DocumentLibrary from './components/DocumentLibrary';
import WelcomePage from './components/WelcomePage'; // Import the WelcomePage

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar fluid rounded className="shadow-md bg-white">
          <NavbarBrand>
            <Link to="/" className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Media Library
            </Link>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink>
              <Link to="/" className={window.location.pathname === "/" ? "text-blue-700" : ""}>
                Home
              </Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/videos" className={window.location.pathname === "/videos" ? "text-blue-700" : ""}>
                Videos
              </Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/audio" className={window.location.pathname === "/audio" ? "text-blue-700" : ""}>
                Audio
              </Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/documents" className={window.location.pathname === "/documents" ? "text-blue-700" : ""}>
                Documents
              </Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/upload" className={window.location.pathname === "/upload" ? "text-blue-700" : ""}>
                Upload
              </Link>
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>

        <main className="bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/videos" element={<VideoLibrary />} />
            <Route path="/audio" element={<AudioLibrary />} />
            <Route path="/documents" element={<DocumentLibrary />} />
            <Route path="/upload" element={<VideoUpload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}