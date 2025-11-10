'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import useRequest from '@/shared/hooks/useRequest';
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export default function GoLiveTemplate() {
  
  const router = useRouter()
  const request = useRequest();
  const [started, setStarted] = useState(false);
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  if (!user?.id) return;
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const creatorData = {
    roomId: user.id,
    userId: user.id, // Your Clerk user ID
    userImageUrl: user.imageUrl || 'https://cdn.clerk.com/image.jpg',
    userName: user.firstName || 'Anonymous',
    title: title,
    description: description,
    thumbnailUrl: thumbnailUrl,
  };
  const [socket] = useState(() =>
    io(NEXT_PUBLIC_BACKEND_URL, { transports: ['websocket'] }),
  );
  const peerRef = useRef<Peer.Instance | null>(null);


  const handleLive = () => {
    console.log('[BROADCAST] joining room:', creatorData);
    socket.emit('join-room-creator', creatorData);

    socket.on('connect', () => console.log('[SOCKET] connected', socket.id));
    socket.on('disconnect', () => console.log('[SOCKET] disconnected'));

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStarted(true);
        console.log('[BROADCAST] started?', started);
        console.log('[MEDIA] got stream', stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
        streamRef.current = stream;
        socket.on('viewer-joined', ({ viewerId }) => {
          console.log('[EVENT] viewer-joined', viewerId);
          const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
            config: {
              iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
              ],
            },
          });

          peer.on('signal', (data) => {
            console.log('[PEER] signal sending', data.type);
            socket.emit('signal', { to: viewerId, from: socket.id, signal: data });
          });

          peer.on('connect', () => console.log('[PEER] connected with viewer'));
          peer.on('error', (err) => console.error('[PEER] error', err));
          peer.on('close', () => console.log('[PEER] closed'));

          socket.on('signal', ({ from, signal }) => {
            if (from === viewerId) {
              console.log('[SOCKET] got signal from viewer', signal.type);
              peer.signal(signal);
            }
          });

          peerRef.current = peer;
        });
      })
      .catch((err) => console.error('[MEDIA] error', err));
  }

  const handleEndLive = async () => {
    const streamm = streamRef.current;
    if (streamm) {
      streamm.getTracks().forEach((track) => track.stop());

    }
    console.log('[END] disconnecting socket');
    socket.disconnect();
    peerRef.current?.destroy();
    streamRef.current = null;
    setStarted(false);
    console.log('[END] ending live for room:', creatorData.roomId);
    const response = await request.home.endLive(creatorData.roomId);
    console.log('End live response', response);
    router.push('/');
  };

  useEffect(() => {

    return () => {
      if (streamRef.current) {

        console.log('[CLEANUP] component unmounting, ending live');
        handleEndLive();
      }
    }
  }, []);
/////////// current task
  const setThumbnailFile = async (file: File | null) => {
    const formData = new FormData();
    if (file)
      formData.append('file', file);
  formData.append("upload_preset", "unsigned_upload"); // your new unsigned preset


    const res = await fetch('https://api.cloudinary.com/v1_1/dxy8ogudg/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setThumbnailUrl(data.secure_url); // ✅ real URL accessible online
  };
  return (
    
    <div className="flex flex-col items-center bg-gray-50 pb-10 pt-5 rounded-md shadow-md">
      <p className='text-gray-700 text-2xl w-full px-6 hidden sm:block'>Going Live:</p>
      <video ref={videoRef} autoPlay muted playsInline className={`rounded-lg w-96 border ${started ? 'block' : 'hidden'}`} />
     <div className=' w-full pt-5 px-10' > 
      { !started ? <>
        <div className="flex flex-col items-center my-4">
      <label
        htmlFor="thumbnail-upload"
        className="w-48 h-48 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative overflow-hidden"
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Thumbnail Preview"
            className="object-cover w-full h-full rounded-xl"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-5xl font-light">+</span>
            <span className="text-sm mt-1">Upload Thumbnail</span>
          </div>
        )}
      </label>

      <input
        id="thumbnail-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThumbnailFile(e.currentTarget.files?.[0] ?? null)}
      />

    </div>
    <div className='flex flex-col w-full justify-center items-center'>
      <input onChange={(e) => setTitle(e.target.value)} className='px-3 border border-gray-600 p-1 rounded-md w-full max-w-160 text-gray-800 my-2' placeholder='Title' type="text" value={title} />
      <textarea onChange={(e) => setDescription(e.target.value)} className='px-3 border border-gray-600 p-1 rounded-md h-24 w-full text-gray-800 max-w-160' placeholder='Description' value={description} />
         </div>
        {/* <input type="file" className='border text-gray-600 border-gray-600 p-1 rounded-md w-full max-w-xs my-2 ' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThumbnailFile(e.currentTarget.files?.[0] ?? null)} /> */}
      </>:<div className='flex flex-col w-full justify-center items-center'>
       <span className=' px-3  p-1 text-xl  text-gray-800 my-2'>{title}</span>  
       <p className='px-3  p-1 text-sm text-gray-600 my-2'>{description}</p>
        </div>
      } 
        </div>
         <div>
      {
        started ?  
        <button onClick={handleEndLive} className="mt-2 bg-gray-800 text-white py-2 px-4 rounded">End Broadcast</button>
        :  <button onClick={handleLive} className="mt-2 bg-gray-800 text-white py-2 px-4 rounded">Start Broadcast</button>
      }
      
      </div>
    </div>
  );
}
