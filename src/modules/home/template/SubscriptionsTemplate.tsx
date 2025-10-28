'use client'
import useRequest from '@/shared/hooks/useRequest'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import LikedVideoCard from '../components/LikedVideoCard'
import { Video } from '@/shared/models/video'
import { Heart } from 'lucide-react';
import { Span } from 'next/dist/trace'

const SubscriptionsTemplate = () => {
  const request = useRequest()
  const { user } = useUser()
  type Creator = { userId: string; userName: string | undefined; userImageUrl?: string }
  const [creators, setCreators] = useState<Creator[]>([])
  const [videos, setVideos] = useState<Video[]>([])

  async function fetchSubscribedVideos() {
    if(user) {
      const response = await request.home.getSubscribedVideos(user?.id)
      console.log("Subscribed videos response:", response);
      if (response === "No Subscriptions") {
  console.log("User has no subscriptions");
   return
} else {
 

    // Extract one representative video per user
const subCreators = Object.values(response as Record<string, Video[]>).map((vi) => {
  const firstVideo = vi[0]; // all videos from same user have same info
  return {
    userId: firstVideo.userId,
    userName: firstVideo.userName,
    userImageUrl: firstVideo.userImageUrl,
  };
});

console.log(subCreators,"Creators");
setCreators(subCreators);
      
    const allVideos = Object.values(response as Record<string, Video[]>).flat();
    console.log("All videos:", allVideos);


      setVideos(allVideos)
    }
  }
  }
  useEffect(() => {
    fetchSubscribedVideos()
  },[user])
  
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-10 px-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className='flex gap-2 '>
            {
                creators.map((c) => (
                  <div key={c.userId} className='flex flex-col items-center justify-center  gap-2 text-center'>
                    {c.userImageUrl ? <img  className="h-12 w-12 rounded-full object-cover"  src={c.userImageUrl} alt={c.userName ?? ''} /> : null}
                    {c.userName? <span className='text-gray-300 text-sm'>{c.userName}</span>: " "}
                  </div>
                ))
              }
            
          </div>
        </div>

        {/* List View */}
        <div className="flex flex-col divide-y divide-gray-800">
          {videos.map((video) => (
            <div key={video._id} className="py-4 hover:bg-gray-900/60 transition-colors rounded-xl">
              <LikedVideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SubscriptionsTemplate