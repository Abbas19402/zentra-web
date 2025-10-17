
'use client';
import { useState, useEffect } from 'react';
import Hls from 'hls.js';
import { useUser } from "@clerk/nextjs";
import { Video } from '../types/Video';
import Image from 'next/image';


const HomeTemplate = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoId, setVideoId] = useState<Video | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
 // const [thumbnails, setThumbnails] = useState<string[]>([]);
 // const thumbnailBaseUrl = 'http://192.168.0.55:8080/thumbnails/';


  useEffect(() => {
    fetch('http://192.168.0.55:8080/videos')
      .then(res => res.json())
      .then(data => {
        setVideos(data.videos)
       // const newThumbnails = data.map((item: Video) =>
       //   thumbnailBaseUrl + item._id + "-" + item.title.replace(" ", "_").toLowerCase() + ".png"
      //  );
       // setThumbnails(newThumbnails);
      })
      .catch(err => console.error('Failed to fetch videos', err));
    
  }, []);

  const play = (url: string) => {

    const video = document.getElementById('player') as HTMLVideoElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else {
      video.src = url;
    }
    setSelected(url);
  };

  return (
    <>
      <div className=" p-4">
      {/*  {thumbnails.map(thumb => (
          <Image src={thumb} alt="Video Thumbnail" width={200} height={100} key={thumb} />
        ))} */ }

      {    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {videos.map((v) => (
                  <div key={v._id} className="bg-[#F2F2F2] rounded-lg overflow-hidden cursor-pointer">
                    <div className="relative w-full h-36 md:h-40 lg:h-44">
                      <Image onClick={() => play(v.url)}
                        src={v.thumbnailUrl}
                        alt="Video Thumbnail"
                        fill={true}
                        className="object-cover"
                      />
                    </div>
              {/* Text content */}
      <div className="p-2">
        <h1 className="font-semibold text-sm truncate">{v.title}</h1>
        <p className="text-gray-400 text-xs line-clamp-2 mt-1">{v.description}</p>
      </div>
              
            </div>

          ))}
        </div>  }
      </div>
      {selected && (
        <div style={{ marginTop: 20 }}>
          <video id="player" controls width="720"></video>
        </div>
      )}
    </>

  )
}

export default HomeTemplate