'use client'

import React, { useEffect, useState } from 'react'
import Hls from 'hls.js'
import { Video } from '@/shared/models/video'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import useRequest from '@/shared/hooks/useRequest'
import CommentsSect from '../components/CommentsSect'


const VideoPlayerTemplate: React.FC<{metadata: Video}> = ({ metadata }) => {
  const [ isSaved, setIsSaved] = useState<boolean>(false)
  const [ isSubscibed, setSubscribed] = useState<boolean>( false )
  const [likeStatus , setLikeStatus] = useState<'LIKED' | 'DISLIKED' | null>(null)
  const [likesCount, setLikesCount] = useState(metadata.likesCount)
  const { user, isSignedIn } = useUser()
  const request = useRequest()

  const handleLikeVideo = async() => {
    if(isSignedIn && user) {
      const response = await request.home.likeVideo(metadata.userId, metadata._id, user.id)
      getLikeStatus()
      console.log(response)
      setLikesCount(response);
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
      const response = await request.home.dislikeVideo(metadata.userId, metadata._id, user.id)
      getLikeStatus()
       console.log(response)
      setLikesCount(response);
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
      } else if(!(response === true || response === false)) {
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
  const handleSubscribe = async(checking: boolean) => {

     if(isSignedIn && user) {
    
      console.log('checking',checking)
      const response = await request.home.subscribe(metadata.userId, user.id, checking)
      console.log("Subscription response",response)
      if(response == true)
         setSubscribed(true);
      else if(response == false)
          setSubscribed(false);
        else
      setSubscribed(!isSubscibed)
     }
    else {
      console.log("Sign in to subscribe or Creater doesnt exist")
    }
  }

  const play = () => {
    console.log(metadata.url)
    const video = document.getElementById('player') as HTMLVideoElement;
      video.src = metadata.url;
    };

  useEffect(() => {
    handleSubscribe(true)
    play()
    getLikeStatus()
    getSaveStatus()
  },[metadata.url, user, isSignedIn])
  return (
  <div className="w-full h-full flex flex-col lg:flex-row gap-6 pr-3 md:pr-0">
    {/* Video & Info */}
    <div className="flex flex-col flex-1">
      {/* Video Player */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-gray-800">
        <video
          id="player"
          className="w-full h-full object-cover"
          controls
        ></video>
      </div>

       <div>
          {metadata.title && (
          <div className="flex items-center space-x-3 text-gray-800 mt-4 px-4">
            <h1 className="font-semibold">{metadata.title}</h1>
          </div>
        )}
       </div>
      {/* User Info + Actions */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-4 w-full">
        {(metadata.userImageUrl && metadata.userName) && (
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-400">
              <Image src={metadata.userImageUrl} alt={metadata.title} fill className="object-cover" />
            </div>
            <span className=" text-gray-800">{metadata.userName}</span>
            { !isSubscibed?
            <span onClick={() => handleSubscribe(false)} className='text-xs text-gray-800 border border-gray-800 px-1 py-1 rounded-md hover:bg-black hover:text-white'>Subscribe +</span>
            :
     <span onClick={() => handleSubscribe(false)} className='text-xs bg-white text-gray-800 border border-black px-1 py-1 rounded-md hover:bg-gray-800 hover:text-white'>Subscribed</span>
       
}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLikeVideo}
            className={` bg-gray-100 shadow-md transition-colors text-gray-800 hover:text-white hover:bg-gray-800 px-2  rounded-md flex items-center justify-center`}
          >
            {(likeStatus === 'DISLIKED' || likeStatus === null) ? 'Like' : (likeStatus === 'LIKED' || likeStatus === null) ? 'Liked' : ''}
          </button>
          <button
            onClick={handleDislikeVideo}
            className={`bg-gray-100 shadow-md  transition-colors text-gray-800 hover:text-white hover:bg-gray-800 px-2  rounded-md flex items-center justify-center`}
          >
            {(likeStatus === 'LIKED' || likeStatus === null) ? 'Dislike' : (likeStatus === 'DISLIKED' || likeStatus === null) ? 'Disliked' : ''}
          </button>
          <button
            onClick={handleSaveVideo}
            className={`bg-gray-100 shadow-md  transition-colors text-gray-800 hover:text-white hover:bg-gray-800 px-2  rounded-md flex items-center justify-center`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Description Box */}
      <div className="mt-4 p-4 bg-gray-100 text-gray-700 rounded-xl min-h-[7rem] flex flex-col space-y-2  shadow-md">
        <div className='flex justify-between items-center'>
        <strong className="text-md text-gray-700">Description</strong>
        <strong className="text-md text-gray-700">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</strong>
        </div>
        <p className="text-sm font-medium whitespace-pre-wrap">{metadata.description.trimStart()}</p>
      </div>
    </div>

    {/* Comments Section */}
    <div className="w-full lg:w-[30%] lg:min-w-[200px] ">
      <CommentsSect />
    </div>
  </div>
);

}

export default VideoPlayerTemplate