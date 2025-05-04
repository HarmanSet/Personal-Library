import React, { useEffect, useState } from 'react';
import { Card, TextInput, Button, Spinner } from 'flowbite-react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/videos/type/video');
      setVideos(response.data);

      // Set the first video as selected if available and no video is currently selected
      if (response.data.length > 0 && !selectedVideo) {
        setSelectedVideo(response.data[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchVideos();
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/videos/search?title=${searchQuery}&fileType=video`);
      setVideos(response.data);

      // Set the first video as selected if available
      if (response.data.length > 0) {
        setSelectedVideo(response.data[0]);
      } else {
        setSelectedVideo(null);
      }

      setIsSearching(false);
    } catch (error) {
      console.error('Error searching videos:', error);
      setIsSearching(false);
    }
  };

  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Video Library</h1>

      <div className="mb-6 flex">
        <div className="search-container flex-grow">
          <TextInput
            id="search"
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="ml-2">
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Searching...</span>
              </>
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          {selectedVideo ? (
            <VideoPlayer video={selectedVideo} />
          ) : (
            <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">No video selected</p>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Video List</h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="xl" />
              </div>
            ) : videos.length === 0 ? (
              <p className="text-center text-gray-500">No videos found</p>
            ) : (
              // <div className="space-y-3">
              //   {videos.map((video) => (
              //     <Card key={video.id} className={`cursor-pointer hover:bg-gray-100 ${selectedVideo && selectedVideo.id === video.id ? 'border-blue-500 border-2' : ''}`} onClick={() => playVideo(video)}>
              //       <div className="flex items-center">
              //         <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded overflow-hidden">
              //           {video.thumbnailUrl ? (
              //             <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              //           ) : (
              //             <div className="w-full h-full flex items-center justify-center">
              //               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              //               </svg>
              //             </div>
              //           )}
              //         </div>
              //         <div className="ml-4">
              //           <h3 className="text-sm font-medium truncate">{video.title}</h3>
              //           <p className="text-xs text-gray-500">{new Date(video.uploadDate).toLocaleDateString()}</p>
              //         </div>
              //       </div>
              //     </Card>
              //   ))}
              // </div>
              <div className="space-y-3">
                {videos.map((video) => (
                  <Card
                    key={video.videoId}
                    className={`cursor-pointer hover:bg-gray-100 hover:text-black ${selectedVideo && selectedVideo.videoId === video.videoId
                        ? 'border-blue-500 border-2'
                        : ''
                      }`}
                    onClick={() => playVideo(video)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded overflow-hidden">
                        {video.thumbnailUrl ? (
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium truncate">{video.title}</h3>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoLibrary;