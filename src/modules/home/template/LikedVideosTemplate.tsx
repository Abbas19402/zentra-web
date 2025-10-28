'use client'
import useRequest from '@/shared/hooks/useRequest'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import LikedVideoCard from '../components/LikedVideoCard'
import { Video } from '@/shared/models/video'
import { Heart } from 'lucide-react';

const LikedVideosTemplate = () => {
  const request = useRequest()
  const { user } = useUser()

  const [videos, setVideos] = useState<Video[]>([])

  async function fetchLikedVideos() {
    if(user) {
      const response = await request.home.getLikedVideos(user?.id)
      console.log("Liked videos response:", response);

      let videosArray: Video[] = []
      for(let res of response) {
        let videoDoc = res._doc as Video
        videoDoc.userName = res.userName
        videoDoc.userImageUrl = res.userImageUrl
        videosArray.push(videoDoc)
      }

      setVideos(videosArray)
    }
  }

  useEffect(() => {
    fetchLikedVideos()
  },[user])

   if (videos.length === 0)
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400">
          <Heart className="w-10 h-10 text-sky-600 mb-3" />
          <p className="text-lg font-semibold">No Liked videos yet 💔</p>
          <p className="text-sm text-gray-500 mt-1">Start exploring and like the ones you love!</p>
        </div>
      );
  
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-10 px-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-sky-400 flex items-center gap-2">
            <Heart className="w-6 h-6 fill-sky-500 text-sky-500" />
            My Liked Videos
          </h1>
          <span className="text-sm text-gray-500">{videos.length} Liked</span>
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

export default LikedVideosTemplate