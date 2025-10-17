
'use client';
import { useState, useEffect } from 'react';
import Hls from 'hls.js';
import { useUser } from "@clerk/nextjs";
import { Video } from '../types/Video';

export default function MyVideosTemplate() {

  const { user, isLoaded, isSignedIn } = useUser();
 
  const [videos, setVideos] = useState<Video[]>([]);  
  const [videoId, setVideoId] = useState<Video | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
     fetch(`http://192.168.0.55:8080/videos/user/${user?.id}`)
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
    form.append('title', title ?? '');
    form.append('description', description ?? '');
    form.append('userId', user?.id ?? '');
    console.log(form.get('title'));

    const res = await fetch('http://192.168.0.55:8080/videos/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    setVideoId(data.videoId);
    setUploading(false);
  };

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

    if (!isLoaded || !isSignedIn) return <p>Please Sign In.</p>;
      console.log(user.id);
  return (
    <main style={{ padding: 20 }}>
      <span className='text-2xl tracking-wider font-semibold'>Upload a video</span>
      <input className='h-20 w-96 border-dashed border-2 border-gray-300 rounded-2xl flex justify-center items-center mt-2 mb-16' type="file" accept="video/*" title='Upload Video here...' onChange={upload}></input>
      <input className='border-2 border-gray-300 rounded-lg p-2 mt-2' type="text" placeholder='Title' value={title ?? ''} onChange={(e) => setTitle(e.target.value)} />
      <input className='border-2 border-gray-300 rounded-lg p-2 mt-2' type="text" placeholder='Description' value={description ?? ''} onChange={(e) => setDescription(e.target.value)} />

      {uploading && <p>Uploading & encoding... please wait (ffmpeg running on backend)</p>}
      <div>
        <span className='text-2xl font-semibold'>Available Videos</span>
        <ul className='flex flex-col space-y-2 mt-2'>
          {videos.map((v) => (
            <li key={v._id} className='w-[70vw] h-10 rounded-lg bg-slate-50'>
              <button className='p-2 min-w-32 h-10 flex justify-center items-center font-bold' onClick={() => play(v.url)}>Play {v._id}</button>
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
