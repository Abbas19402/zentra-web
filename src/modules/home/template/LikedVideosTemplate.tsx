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
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([])

  async function fetchLikedVideos() {
    if(user) {
      try {
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
    } catch (error) {
      console.error('Failed to fetch liked videos:', error);
    } finally {
      setLoading(false);
    }
    }
  }

  useEffect(() => {
    fetchLikedVideos()
  },[user])

  
 if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
        <div className="animate-pulse text-gray-700 mb-3">Loading your favorites...</div>
        <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

     if (videos.length === 0)
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400">
          <Heart className="w-10 h-10 text-gray-700 mb-3" />
          <p className="text-lg font-semibold">No Liked videos yet 💔</p>
          <p className="text-sm text-gray-500 mt-1">Start exploring and like the ones you love!</p>
        </div>
      );
  

  return (
    <main className="w-full min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4 mt-2">
         
          <span className="text-sm text-gray-500">{videos.length} liked</span>
        </div>

        {/* List View */}
        <div className="flex flex-col divide-y divide-gray-300">
          {videos.map((video) => (
            <div key={video._id} className=" transition-colors rounded-xl">
              <LikedVideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default LikedVideosTemplate