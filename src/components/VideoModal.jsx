import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/youtube'

function VideoModal({visible, setIsVideoModalVisible, videoKey}) {

  useEffect(() => {
    if (visible) {
        setIsVideoModalVisible(true);
    } else {
        setIsVideoModalVisible(false);
    }
    
  }, [visible])

  return (
    <>
    {visible && (
        <div className="fixed top-0 right-0 left-0 bottom-0 w-screen h-screen z-30">
          <div onClick={() => setIsVideoModalVisible(false)} className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(49,49,49,0.8)]"></div>
          <div className="absolute w-[320px] sm:w-[550px] md:w-[768px] h-[400px] top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <button className="absolute top-[-24px] right-[4px] text-white font-bold" onClick={() => setIsVideoModalVisible(false)}>
              CLOSE
            </button>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoKey && videoKey}`}
                controls
                width="100%"
                height="100%"
                // playing={true}
            />
          </div>
        </div>
    )}
    </>
  );
}

export default VideoModal;