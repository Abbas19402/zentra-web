'use client';
import React, { useEffect, useState } from 'react';
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';
import { Video } from '@/shared/models/video';
import LikedVideoCard from '../components/LikedVideoCard';
import { Heart } from 'lucide-react';

const MyListTemplate = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const request = useRequest();
  const { user } = useUser();

  useEffect(() => {
    const fetchSavedVideos = async () => {
      if (!user?.id) return;
      try {
        const response = await request.home.savedVideos(user.id);

        const videosArray: Video[] = response.map((res: any) => ({
          ...(res._doc as Video),
          userName: res.userName,
          userImageUrl: res.userImageUrl,
        }));

        setVideos(videosArray);
      } catch (error) {
        console.error('Failed to fetch saved videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVideos();
  }, [user]);

   if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
        <div className="animate-pulse text-gray-700 mb-3">Loading your saved ones...</div>
        <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (videos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400">
        <Heart className="w-10 h-10 text-gray-700 mb-3" />
        <p className="text-lg font-semibold">No Saved videos yet 💔</p>
        <p className="text-sm text-gray-500 mt-1">Start exploring and save the ones you love!</p>
      </div>
    );

  return (
    <main className="w-full min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4 mt-2">
         
          <span className="text-sm text-gray-500">{videos.length} saved</span>
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
};

export default MyListTemplate;
