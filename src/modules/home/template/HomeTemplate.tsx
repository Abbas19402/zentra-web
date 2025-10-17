'use client'
import useRequest from '@/shared/hooks/useRequest';
import { Video } from '@/shared/models/video';
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

const HomeTemplate = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const request = useRequest()
  const router = useRouter()
  
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
      <div className='grid grid-cols-4 space-x-4 space-y-3 mt-2 '>
        {(videos.filter(v => v.thumbnailUrl)).map((v) => (
            <div 
              onClick={() => {router.push('/video/'+v._id)}} 
              key={v._id} 
              className="flex flex-col justify-start items-start space-y-2 mb-10"
            >
              <div key={v._id} className="relative w-64 h-36 aspect-video rounded-2xl overflow-hidden">
                <Image src={v.thumbnailUrl} alt={v.title} fill={true}/>
              </div>
              <div className="w-full flex justify-start items-center space-x-2">
                  {/* Avatar */}
                  <div className="w-8 h-8 relative rounded-full overflow-hidden">
                    {v.userImageUrl && v.userImageUrl != '' && <Image src={v.userImageUrl} alt={v._id} fill={true}/>}
                  </div>
                  
                  <div className="flex flex-col space-y-0.5">
                    <strong className='capitalize tracking-wide text-md'>{v.title}</strong>
                    <span className='text-xs'>{v.userName}</span>
                  </div>
              </div>
            </div>
        ))}
      </div>
  )
}

export default HomeTemplate