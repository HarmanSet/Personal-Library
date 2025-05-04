import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import VideoLibrary from './components/VideoLibrary';
import VideoUpload from './components/VideoUpload';
import AudioLibrary from './components/AudioLibrary';
import DocumentLibrary from './components/DocumentLibrary';
import WelcomePage from './components/WelcomePage'; // Import the WelcomePage

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar fluid rounded className="shadow-md bg-white">
          <Navbar.Brand as={Link} to="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Media Library
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link as={Link} to="/" active={window.location.pathname === "/"}>
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} to="/videos" active={window.location.pathname === "/videos"}>
              Videos
            </Navbar.Link>
            <Navbar.Link as={Link} to="/audio" active={window.location.pathname === "/audio"}>
              Audio
            </Navbar.Link>
            <Navbar.Link as={Link} to="/documents" active={window.location.pathname === "/documents"}>
              Documents
            </Navbar.Link>
            <Navbar.Link as={Link} to="/upload" active={window.location.pathname === "/upload"}>
              Upload
            </Navbar.Link>
          </Navbar.Collapse>
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

export default App;