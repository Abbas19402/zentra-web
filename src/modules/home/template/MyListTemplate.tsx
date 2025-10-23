'use client';
import React, { useEffect, useState } from 'react';
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';
import VideoCard from '../components/VideoCard';
import { Video } from '@/shared/models/video';

const MyListTemplate = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const request = useRequest();
  const { user } = useUser();

  useEffect(() => {
    const fetchSavedVideos = async () => {
      if (!user?.id) return;
      try {
        const response = await request.home.savedVideos(user.id);
        
        let videosArray: Video[] = []
        for(let res of response) {
          let videoDoc = res._doc as Video
          videoDoc.userName = res.userName
          videoDoc.userImageUrl = res.userImageUrl
          videosArray.push(videoDoc)
        }
        
        setVideos(videosArray);
      } catch (error) {
        console.error('Failed to fetch saved videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVideos();
  }, [user]);
  useEffect(() => {
  console.log('Updated videos:', videos);
}, [videos]);

  if (loading) return <p className="text-gray-500 p-4">Loading your saved videos...</p>;

  if (videos.length === 0)
    return <p className="text-gray-500 p-4">No saved videos yet 😅</p>;

  return (
    <div className='grid grid-cols-4 gap-x-3 gap-y-6 mt-2 pr-3'>
        {(videos.filter(v => v.thumbnailUrl)).map((v) => <VideoCard key={v._id} video={v}/>)}
      </div>
  );
};

export default MyListTemplate;
