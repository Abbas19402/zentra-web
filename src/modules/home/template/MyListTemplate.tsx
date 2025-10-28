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
        <div className="animate-pulse text-sky-500 mb-3">Loading your favorites...</div>
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (videos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400">
        <Heart className="w-10 h-10 text-sky-600 mb-3" />
        <p className="text-lg font-semibold">No Saved videos yet 💔</p>
        <p className="text-sm text-gray-500 mt-1">Start exploring and save the ones you love!</p>
      </div>
    );

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-10 px-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-sky-400 flex items-center gap-2">
            <Heart className="w-6 h-6 fill-sky-500 text-sky-500" />
            My Saved Videos
          </h1>
          <span className="text-sm text-gray-500">{videos.length} saved</span>
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
  );
};

export default MyListTemplate;
