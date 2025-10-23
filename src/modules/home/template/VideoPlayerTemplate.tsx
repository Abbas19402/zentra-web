'use client'

import React, { useEffect, useState } from 'react'
import Hls from 'hls.js'
import { Video } from '@/shared/models/video'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import useRequest from '@/shared/hooks/useRequest'


const VideoPlayerTemplate: React.FC<{metadata: Video}> = ({ metadata }) => {
  const [ isSaved, setIsSaved] = useState<boolean>(false)
  const [ isLiked, setIsLiked ] = useState<boolean>(false)
  const [likeStatus , setLikeStatus] = useState<'LIKED' | 'DISLIKED' | null>(null)

  const { user, isSignedIn } = useUser()
  const request = useRequest()

  const handleLikeVideo = async() => {
    if(isSignedIn && user) {
      await request.home.likeVideo(metadata.userId, metadata._id, user.id)
      getLikeStatus()
    } else {
      alert("You need to login first")
    }
  } 

   const handleSaveVideo = async() => {
    if(isSignedIn && user && metadata?.userImageUrl && metadata?.userName) {
      console.log(metadata.userId);
      await request.home.saveVideo(user.id, metadata._id, {
        videoOwnerId: metadata.userId,
        videoOwnerUrl: metadata.userImageUrl,
        videoOwnerName: metadata.userName
      } )
      getSaveStatus()
    } else {
      alert("You need to login first")
    }
  } 

  const handleDislikeVideo = async() => {
    if(isSignedIn && user) {
      await request.home.dislikeVideo(metadata.userId, metadata._id, user.id)
      getLikeStatus()
    } else {
      alert("You need to login first")
    }
  } 

  const getLikeStatus = async() => {
    if(isSignedIn && user) {
      const response = await request.home.getLikeStatus(metadata._id, user.id)
      if(response) {
        setLikeStatus('LIKED')
      } else if(response === false) {
        setLikeStatus('DISLIKED')
      } else if(response === null) {
        setLikeStatus(null)
      }
    }
  }
  const getSaveStatus = async() => {
    if(isSignedIn && user) {
      const response = await request.home.getSaveStatus(metadata._id, user.id)
      console.log("yera tera res",response)
      if(response === true) {
        setIsSaved(true)
      } else if(response === false) {
         setIsSaved(false)
      }
    }
  }

  const play = () => {
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
    play()
    getLikeStatus()
    getSaveStatus()
  },[metadata.url, user, isSignedIn])
  return (
    <div className="w-full h-full">
      <video id="player" className='rounded-2xl aspect-video w-[55vw]' controls></video>
      <div className="w-[55vw] h-10 rounded-full mt-3 flex justify-between items-center">
        {(metadata.userImageUrl && metadata.userName) && <div className="flex space-x-2 items-center">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border shrink-0">
            <Image src={metadata.userImageUrl} alt={metadata.title} fill={true}/>
          </div>
          <span className="font-semibold">{metadata.userName}</span>
        </div>}

        <div className="flex items-center space-x-2">
          <button onClick={handleLikeVideo} className='bg-slate-100 hover:bg-slate-200 w-12 h-9 rounded-xl'><span className='text-sm font-bold'>{(likeStatus === 'DISLIKED' || likeStatus === null) ? 'Like' : (likeStatus === 'LIKED' || likeStatus === null) ? 'Liked' : ''}</span></button>
          <button onClick={handleDislikeVideo} className='bg-slate-100 hover:bg-slate-200 w-12 h-9 rounded-xl'><span className='text-sm font-bold'>{(likeStatus === 'LIKED' || likeStatus === null) ? 'Dislike' : (likeStatus === 'DISLIKED' || likeStatus === null) ? 'Disliked' : ''}</span></button>
           {isSaved?  <button onClick={handleSaveVideo} className='bg-slate-100 hover:bg-slate-200 w-12 h-9 rounded-xl'><span className='text-sm font-bold'>Saved</span></button>
 :          <button onClick={handleSaveVideo} className='bg-slate-100 hover:bg-slate-200 w-12 h-9 rounded-xl'><span className='text-sm font-bold'>Save</span></button>
  }
         </div>
      </div>

      <div className="w-[55vw] h-fit p-3 bg-gray-200 text-black mt-3 rounded-xl min-h-28 flex flex-col space-y-2">
        <strong className='text-md'>Description</strong>
        <p className="text-sm font-medium whitespace-pre-wrap">{metadata.description.trimStart()}</p>
      </div>
    </div>
  )
}

export default VideoPlayerTemplate