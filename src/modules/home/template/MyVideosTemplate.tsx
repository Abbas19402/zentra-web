
'use client';
import { useState, useEffect } from 'react';
import Hls from 'hls.js';

interface Video {
  videoId: string; 
  playlist: string;
}

export default function MyVideosTemplate() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoId, setVideoId] = useState<Video | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
     fetch('http://192.168.0.55:8080/videos')
       .then(res => res.json())
       .then(data => setVideos(data))
       .catch(err => console.error('Failed to fetch videos', err));
  }, []);

  const upload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('video', file);

    const res = await fetch('http://192.168.0.55:8080/videos/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    setVideoId(data.videoId);
    setUploading(false);
  };

  const play = (playlist: string) => {
   // const url = `http://192.168.0.55:5001/hls/${videoId}/playlist.m3u8`;
    const video = document.getElementById('player') as HTMLVideoElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(playlist);
      hls.attachMedia(video);
    } else {
      video.src = playlist;
    }
    setSelected(playlist);
  };

  return (
    <main style={{ padding: 20 }}>
      <span className='text-2xl tracking-wider font-semibold'>Upload a video</span>
      <input className='h-20 w-96 border-dashed border-2 border-gray-300 rounded-2xl flex justify-center items-center mt-2 mb-16' type="file" accept="video/*" title='Upload Video here...' onChange={upload}></input>
      {uploading && <p>Uploading & encoding... please wait (ffmpeg running on backend)</p>}
      <div>
        <span className='text-2xl font-semibold'>Available Videos</span>
        <ul className='flex flex-col space-y-2 mt-2'>
          {videos.map((v) => (
            <li key={v.videoId} className='w-[70vw] h-10 rounded-lg bg-slate-50'>
              <button className='p-2 min-w-32 h-10 flex justify-center items-center font-bold' onClick={() => play(v.playlist)}>Play {v.videoId}</button>
            </li>
          ))}
        </ul>
      </div>
       {selected && (
        <div style={{ marginTop: 20 }}>
          <video id="player" controls width="720"></video>
        </div>
      )}
    </main>
  );
}
