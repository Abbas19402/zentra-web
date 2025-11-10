'use client';
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import useRequest from '@/shared/hooks/useRequest'
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function WatchLiveTemplate(roomIdProp?: { roomId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const roomId = roomIdProp?.roomId || 'zentra-live-room';
  const [roomMetadata, setRoomMetadata] = useState<any>(null);
   const request = useRequest()

  // ✅ Create socket only once
  const [socket] = useState(() =>
    io(NEXT_PUBLIC_BACKEND_URL, { transports: ['websocket'] })
  );
/////////////// working here ///////////////////////
   useEffect(() => {
    const metadata = async () => {     
       try {
         const response = await request.home.getRoomMetadata(roomId);
  
         console.log('[METADATA] room metadata:', response[0]);
         setRoomMetadata(response[0]);
       } catch (err) {
         console.error('[METADATA] error fetching room metadata:', err);
       } 
    };
    metadata();
   }, []);

  useEffect(() => { const join = () => {
    console.log('[VIEWER] joining room:', roomId);
    socket.emit('join-room', roomId);

    socket.on('connect', () => console.log('[SOCKET] connected', socket.id));
    socket.on('disconnect', () => console.log('[SOCKET] disconnected'));

    socket.on('signal', ({ from, signal }) => {
      console.log('[SOCKET] got signal', signal?.type || '(candidate)');

      // If no peer yet → create new one
      if (!peerRef.current) {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
            ],
          },
        });

        peer.on('signal', (data) => {
          console.log('[PEER] sending answer', data.type);
          socket.emit('signal', { to: from, from: socket.id, signal: data });
        });

        peer.on('stream', (stream) => {
          console.log('[PEER] got remote stream');
          if (videoRef.current) videoRef.current.srcObject = stream;
        });

        peer.on('error', (err) => console.error('[PEER] error', err));
        peer.on('connect', () => console.log('[PEER] connected to broadcaster'));
        peer.on('close', () => console.log('[PEER] connection closed'));

        // ✅ First signal (offer)
        try {
          peer.signal(signal);
        } catch (err) {
          console.warn('[PEER] initial signal error:', err);
        }

        peerRef.current = peer;
      } else {
        // ✅ Prevent duplicate setLocalDescription after connection is stable
        const pc = (peerRef.current as any)._pc; // simple-peer's internal RTCPeerConnection
        if (pc?.signalingState === 'stable') {
          console.warn('[PEER] already stable, ignoring duplicate signal');
          return;
        }

        console.log('[PEER] forwarding signal to existing connection');
        try {
          peerRef.current.signal(signal);
        } catch (err) {
          console.warn('[PEER] signal error (ignored):', err);
        }
      }
    });
  }
    join();

  // retry join after 1s if not connected
  const retry = setTimeout(join, 1000);
    // ✅ Cleanup on unmount
    return () => {
     
       if (socket.connected) {
         console.log('[CLEANUP] closing viewer connection');
      peerRef.current?.destroy();
      socket.disconnect();
    }
      
    };
  }, [roomId, socket]);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        className="rounded-lg w-96 border"
      />
      
      {roomMetadata && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-md w-full max-w-md">
          <h2 className="text-lg text-black font-semibold mb-2">{roomMetadata.title}</h2>
          <p className="text-sm text-gray-600">{roomMetadata.description}</p>
        </div>
      )}
    </div>
  );
}
