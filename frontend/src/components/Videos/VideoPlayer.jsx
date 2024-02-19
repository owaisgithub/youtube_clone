import React, { useState, useEffect, useRef } from 'react';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(100);
  const [previousVolume, setPreviousVolume] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current
    if (mute) {
      setVolume(previousVolume)
    } else {
      setVolume(0)
      setPreviousVolume(volume)
    }
    video.muted = !mute
    setMute(!mute)
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    video.volume = e.target.value / 100;
    setVolume(e.target.value);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
    // setFullscreen(!fullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="mt-3">
      <video
        ref={videoRef}
        className="rounded-xl w-full relative"
        src={videoSrc}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
      ></video>
      <div className="bottom-14 left-0 rounded-xl bg-gray-800 bg-opacity-50 px-3 flex items-center">
        <button className="text-white" onClick={togglePlay}>
          {isPlaying ? (
            <img src={'../../public/videoPay.png'} className="w-10"/>
          ) : (
            <img src={'../../public/videoPause.png'} className="w-10"/>
          )}
        </button>
        <input
          type="range"
          className="w-2/3"
          value={currentTime}
          max={duration}
          onChange={(e) => (videoRef.current.currentTime = e.target.value)}
        />
        <span className="text-white items-center font-thin text-sm mx-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
        <div className='flex'>
          <button className="" onClick={toggleMute}>
            {mute ? (
              <img src={'../../public/whiteVolumeMute.png'} className="w-6" />
            ) : (
              <img src={'../../public/whiteVolumeUp.png'} className="w-6" />
            )}
          </button>
          <input
            type="range"
            className="w-2/3"
            value={volume}
            max="100"
            onChange={handleVolumeChange}
          />
          {/* <span className="text-white items-center font-thin text-sm mb-10">{volume} / {100}</span> */}
          <button className="text-white" onClick={toggleFullscreen}> 
            <img src={'../../public/fullScreen.png'} className="w-6 ml-5" />
          </button>
        </div> 
      </div>
      {/* <div className="max-w-4xl mx-auto">
        <video className="w-full rounded-lg" src={videoSrc} controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </div>
  );
};

export default VideoPlayer;
