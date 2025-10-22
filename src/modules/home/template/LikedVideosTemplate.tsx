'use client'
import useRequest from '@/shared/hooks/useRequest'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import LikedVideoCard from '../components/LikedVideoCard'
import { Video } from '@/shared/models/video'

const LikedVideosTemplate = () => {
  const request = useRequest()
  const { user } = useUser()

  const [videos, setVideos] = useState<Video[]>([])

  async function fetchLikedVideos() {
    if(user) {
      const response = await request.home.getLikedVideos(user?.id)

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
  
  return (
    <div className='w-full pr-5'>
      {videos.map((video) => {
        return <LikedVideoCard key={video._id} video={video}/>
      })} 
    </div>
  )
}

export default LikedVideosTemplate