'use client';
import useRequest from '@/shared/hooks/useRequest';
import { Video } from '@/shared/models/video';
import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

const HomeTemplate = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [liveVideos, setLiveVideos] = useState<Video[]>([]);
  const request = useRequest();

  const fetchVideos = async () => {
    const response = await request.home.getAllVideos();
    if (response?.videos?.length) {
      const { users, videos } = response;
      const userMap = Object.fromEntries(users.map((u: any) => [u.id, u]));

      const videosWithUserData = videos.map((v: Video) => {
        const user = userMap[v.userId];
        return {
          ...v,
          userName: `${user?.firstName || 'Unknown'} ${user?.lastName || ''}`,
          userImageUrl: user?.hasImage ? user.imageUrl : '',
        };
      });
      setVideos(videosWithUserData);
    }
  };

  const fetchLiveVideos = async () => {
    const lresponse = await request.home.getLiveVideos();
    if (lresponse?.liveRooms?.length) {
      setLiveVideos(lresponse.liveRooms);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchLiveVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-y-4 items-stretch lg:grid-cols-3 lg:gap-x-3 lg:gap-y-6 mt-2 pr-3 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-4">
      {liveVideos.map(l => (
        <VideoCard key={l._id} video={l} isLive />
      ))}
      {videos
        .filter(v => v.thumbnailUrl)
        .map(v => (
          <VideoCard key={v._id} video={v} isLive={false} />
        ))}
    </div>
  );
};

export default HomeTemplate;
