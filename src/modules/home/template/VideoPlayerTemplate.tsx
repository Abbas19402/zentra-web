'use client'

import React, { useEffect } from 'react'
import Hls from 'hls.js'
import { Video } from '@/shared/models/video'

const VideoPlayerTemplate: React.FC<{metadata: Video}> = ({ metadata }) => {
  const play = () => {
    console.log(metadata.url)
    const video = document.getElementById('player') as HTMLVideoElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(metadata.url);
      hls.attachMedia(video);
    } else {
      video.src = metadata.url;
    }
  };

  useEffect(() => {
    console.log("video::: ", metadata.url)
    play()
  },[metadata.url])
  return (
    <div className="w-full h-full">
      <div className='w-[55vw] h-[65vh] rounded-2xl overflow-hidden aspect-video'>
        <video id="player" controls></video>
      </div>
    </div>
  )
}

export default VideoPlayerTemplate