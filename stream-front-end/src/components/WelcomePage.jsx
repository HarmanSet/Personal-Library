
import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import React from 'react';

function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 px-4">
      <div className="text-center welcome-animation max-w-4xl">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Welcome to StreamHub
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your personal media streaming platform for videos and music
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="max-w-sm media-card bg-gray-700">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-purple-500 bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 w-8 h-8">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                  <path d="M12 12v9"></path>
                  <path d="m16 16-4-4-4 4"></path>
                </svg>
              </div>
              <h5 className="mb-1 text-xl font-bold text-white">Upload Media</h5>
              <p className="text-sm text-gray-400 text-center mb-4">
                Upload your videos and music files to stream anytime
              </p>
              <Button as={Link} to="/upload" gradientDuoTone="purpleToBlue">
                Upload Now
              </Button>
            </div>
          </Card>
          
          <Card className="max-w-sm media-card bg-gray-700">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-blue-500 bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 w-8 h-8">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect>
                </svg>
              </div>
              <h5 className="mb-1 text-xl font-bold text-white">Video Library</h5>
              <p className="text-sm text-gray-400 text-center mb-4">
                Browse and play your video collection
              </p>
              <Button as={Link} to="/videos" gradientDuoTone="cyanToBlue">
                Explore Videos
              </Button>
            </div>
          </Card>
          
          <Card className="max-w-sm media-card bg-gray-700">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 rounded-full bg-green-500 bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-8 h-8">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h5 className="mb-1 text-xl font-bold text-white">Music Library</h5>
              <p className="text-sm text-gray-400 text-center mb-4">
                Listen to your favorite music tracks
              </p>
              <Button as={Link} to="/music" gradientDuoTone="greenToBlue">
                Browse Music
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;