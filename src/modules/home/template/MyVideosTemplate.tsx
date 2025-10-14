
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
     fetch('http://localhost:8080/videos')
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

    const res = await fetch('http://localhost:8080/videos/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    setVideoId(data.videoId);
    setUploading(false);
  };

  const play = (playlist: string) => {
   
   // const url = `http://localhost:5001/hls/${videoId}/playlist.m3u8`;
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
      <h1>Upload a video</h1>
      <input type="file" accept="video/*" onChange={upload} />
      {uploading && <p>Uploading & encoding... please wait (ffmpeg running on backend)</p>}
      <div>
        <h1>Available Videos</h1>
        <ul>
          {videos.map((v) => (
            <li key={v.videoId}>
              <button onClick={() => play(v.playlist)}>Play {v.videoId}</button>
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
