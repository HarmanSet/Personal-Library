import React, { useEffect, useState } from 'react';
import { Card, TextInput, Button, Spinner } from 'flowbite-react';
import axios from 'axios';
import AudioPlayer from './AudioPlayer';

function AudioLibrary() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  const fetchAudioFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/videos/type/audio');
      setAudioFiles(response.data);

      // Set the first audio file as selected if available and no audio is currently selected
      if (response.data.length > 0 && !selectedAudio) {
        setSelectedAudio(response.data[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching audio files:', error);
      setLoading(false);
    }
  };

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) {
  //     fetchAudioFiles();
  //     return;
  //   }

  //   setIsSearching(true);
  //   try {
  //     const response = await axios.get(`http://localhost:8080/api/v1/videos/search?title=${searchQuery}&fileType=audio`);
  //     setAudioFiles(response.data);

  //     // Set the first audio file as selected if available
  //     if (response.data.length > 0) {
  //       setSelectedAudio(response.data[0]);
  //     } else {
  //       setSelectedAudio(null);
  //     }

  //     setIsSearching(false);
  //   } catch (error) {
  //     console.error('Error searching audio files:', error);
  //     setIsSearching(false);
  //   }
  // };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchAudioFiles();
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/videos/search?title=${searchQuery}&fileType=audio`);

      setAudioFiles(response.data);
      // setSelectedAudio(null);
      if (response.data.length > 0) {
        setSelectedAudio(response.data[0]);
      } else {
        setSelectedAudio(null);
      }
    } catch (error) {
      console.error('Error searching audio files:', error);
      setIsSearching(false);
    }
  };

  const playAudio = (audio) => {
    setSelectedAudio(audio);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Audio Library</h1>

      <div className="mb-6 flex">
        <div className="search-container flex-grow">
          <TextInput
            id="search"
            type="text"
            placeholder="Search audio files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          {selectedAudio ? (
            <AudioPlayer audio={selectedAudio} />
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">No audio file selected</p>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Audio List</h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="xl" />
              </div>
            ) : audioFiles.length === 0 ? (
              <p className="text-center text-gray-500">No audio files found</p>
            ) : (
              <div className="space-y-3">
                {audioFiles.map((audio) => (
                  <Card key={audio.videoId} className={`cursor-pointer hover:bg-gray-100 hover:text-black ${selectedAudio && selectedAudio.videoId === audio.videoId ? 'border-blue-500 border-2' : ''}`} onClick={() => playAudio(audio)}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium truncate">{audio.title}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <h2>{audio.description}</h2>
                        </div>
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

export default AudioLibrary;