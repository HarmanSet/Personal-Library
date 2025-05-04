import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import VideoLibrary from './components/VideoLibrary';
import VideoUpload from './components/VideoUpload';
import AudioLibrary from './components/AudioLibrary';
import DocumentLibrary from './components/DocumentLibrary';
import WelcomePage from './components/WelcomePage';

function AppNavbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block py-2 pl-3 pr-4 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 ${location.pathname === path ? "text-blue-700" : ""}`;

  return (
    <Navbar fluid rounded className="shadow-md bg-white">
      <NavbarBrand href="/" className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Media Library
      </NavbarBrand>

      <NavbarToggle />
      <NavbarCollapse>
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/videos" className={linkClass("/videos")}>Videos</Link>
        <Link to="/audio" className={linkClass("/audio")}>Audio</Link>
        <Link to="/documents" className={linkClass("/documents")}>Documents</Link>
        <Link to="/upload" className={linkClass("/upload")}>Upload</Link>
      </NavbarCollapse>
    </Navbar>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
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
