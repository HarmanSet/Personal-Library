import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Spinner } from 'flowbite-react';

function AudioPlayer({ audio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // volume range is 0.0 - 1.0
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setIsLoading(true);
      audioRef.current.volume = volume;
    }
  }, [audio]);

  if (!audio) {
    return null;
  }

  const audioUrl = `http://localhost:8080/api/v1/videos/stream/${audio.videoId}`;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const skipTime = 5; // seconds

  const handleSkip = (direction) => {
    if (audioRef.current) {
      const newTime =
        direction === 'forward'
          ? Math.min(audioRef.current.currentTime + skipTime, duration)
          : Math.max(audioRef.current.currentTime - skipTime, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{audio.title}</h2>
        {/* <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Uploaded on {new Date(audio.uploadDate).toLocaleDateString()}</span>
        </div> */}

        <div className="mt-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />

            {isLoading ? (
              <div className="flex justify-center items-center h-16">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center justify-start w-1/3 space-x-1 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`bar ${isPlaying ? 'animate' : ''}`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>


                  <div className="flex items-center justify-center space-x-4 w-1/3">
                    <Button
                      color="gray"
                      pill
                      size="lg"
                      onClick={() => handleSkip('backward')}
                      className="focus:ring-4 focus:ring-blue-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M20 19l-7-7 7-7" />
                      </svg>
                      5s
                    </Button>

                    <Button
                      color="blue"
                      pill
                      size="lg"
                      onClick={togglePlay}
                      className="focus:ring-4 focus:ring-blue-300"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </Button>

                    <Button
                      color="gray"
                      pill
                      size="lg"
                      onClick={() => handleSkip('forward')}
                      className="focus:ring-4 focus:ring-blue-300 flex items-center"
                    >
                      5s
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M4 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>

                  <div className="flex items-center justify-end space-x-2 w-1/3">

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime || 0}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {audio.description && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Song</h3>
            <p className="text-gray-400">{audio.description}</p>
          </div>
        )}

        <div className="mt-4 flex space-x-2">
          <Button color="light" href={audioUrl} download={audio.title}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </Button>

          <Button color="light" onClick={() => navigator.clipboard.writeText(audioUrl)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy Link
          </Button>
        </div>
      </div>
    </Card >
  );
}

export default AudioPlayer;