'use client'
import useRequest from '@/shared/hooks/useRequest';
import { Video } from '@/shared/models/video';
import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard';

const HomeTemplate = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const request = useRequest()
  
  const getUserdata = (id: string, users: any[]) => {
    return users.find(u => u.id == id)
  }

  const fetchVideos = async() => {
    const response = await request.home.getAllVideos()
    if(response?.videos.length > 0) {
      setVideoData(response as {users: any[], videos: Video[]})
    }
  }
  
  const setVideoData = (data: {users: any[], videos: Video[]}) => {
    const videosWithUsernameAndImage = (data.videos as Video[]).map(v => {
      let videoClone = JSON.parse(JSON.stringify(v)) as Video
      const user = getUserdata(v.userId, data.users)
      const userName = `${user.firstName ? user.firstName : 'No firstName'} ${user.lastName ? user.lastName : ''}`
      const userImageUrl = user.hasImage ? user.imageUrl : ""
      videoClone = {...videoClone, userName, userImageUrl}
      return videoClone
    })
    setVideos(videosWithUsernameAndImage)
  }

  useEffect(() => { fetchVideos() }, []);

  return (
      <div className='grid grid-cols-4 gap-x-3 gap-y-6 mt-2 '>
        {(videos.filter(v => v.thumbnailUrl)).map((v) => <VideoCard key={v._id} video={v}/>)}
      </div>
  )
}

export default HomeTemplate