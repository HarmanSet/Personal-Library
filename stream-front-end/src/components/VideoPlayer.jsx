// import React, { useEffect, useRef } from 'react'
// import videojs from 'video.js'
// import Hls from 'hls.js'
// import "video.js/dist/video-js.css"
// import { preload } from 'react-dom'
// import toast from 'react-hot-toast'


// function VideoPlayer({ src }) {

//     const videoRef = useRef(null)
//     const playerRef = useRef(null)

//     useEffect(() => {
//         //for init

//         playerRef.current = videojs(videoRef.current, {
//             controls: true,
//             autoplay: true,
//             muted: true,
//             preload: "auto"
//         })

//         if (Hls.isSupported()) {
//             const hls = new Hls()
//             hls.loadSource(src)
//             hls.attachMedia(videoRef.current)
//             hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                 videoRef.current.play();
//             })
//         } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
//             videoRef.current.src = src
//             videoRef.current.addEventListener('canplay', () => {
//                 videoRef.current.play();
//             })
//         } else {
//             console.log("Video format not supported")
//             toast.error("Video format not supported")
//         }

//     }, [src])

//     return (
//         <div>
//             <div data-vjs-player>

//                 <video ref={videoRef}
//                     style={{
//                         width: "800px",
//                         height: '500px'
//                     }}
//                     className='video-js vjs-control-bar'>
//                 </video>
//             </div>
//         </div>
//     )
// }

// export default VideoPlayer

import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';
import Hls from 'hls.js';
import videojs from 'video.js';
import { useEffect, useRef } from 'react';

// function VideoPlayer({ video }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   if (!video) {
//     return null;
//   }

//   const videoUrl = `http://localhost:8080/api/v1/videos/${video.videoId}/master.m3u8`;

//   useEffect(() => {
//     if (videoRef.current) {
//       if (Hls.isSupported()) {
//         const hls = new Hls();
//         hls.loadSource(videoUrl);
//         hls.attachMedia(videoRef.current);
//         hls.on(Hls.Events.MANIFEST_PARSED, () => {
//           if (isPlaying) videoRef.current.play();
//         });

//         return () => {
//           hls.destroy();
//         };
//       } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
//         videoRef.current.src = videoUrl;
//         videoRef.current.addEventListener('canplay', () => {
//           if (isPlaying) videoRef.current.play();
//         });
//       } else {
//         console.error('HLS not supported');
//       }
//     }
//   }, [videoUrl, isPlaying]);
function VideoPlayer({ video }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  if (!video || !video.videoId) return null;

  const videoUrl = `http://localhost:8080/api/v1/videos/${video.videoId}/master.m3u8`;

  useEffect(() => {
    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      hlsRef.current = new Hls();
      hlsRef.current.loadSource(videoUrl);
      hlsRef.current.attachMedia(videoRef.current);
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
      videoRef.current.addEventListener('canplay', () => {
        videoRef.current.play();
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="p-4">
        <h2 className="text-xl text-black font-bold mb-2">{video.title}</h2>
        {/* <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Uploaded on {new Date(video.uploadDate).toLocaleDateString()}</span>
        </div> */}

        {video.description && (
          <div className="mb-4">
            <h3 className="text-lg text-gray-900 font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{video.description}</p>
          </div>
        )}

        <div className="flex space-x-2">
          <Button color="light" href={videoUrl} download={`${video.title}.m3u8`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </Button>

          <Button color="light" onClick={() => navigator.clipboard.writeText(videoUrl)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;